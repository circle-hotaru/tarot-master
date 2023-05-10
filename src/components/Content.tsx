import { useEffect, useState } from 'react'
import { requestOpenAI } from '~/apis/openai'
import { TAROT_MASTER } from '~/constants'
import OnBoarding from './OnBoarding'
import Waiting from './Waiting'
import Result from './Result'

export const PHASES = {
  ONBOARDING: 'ONBOARDING',
  WAITING: 'WAITING',
  RESULT: 'RESULT',
}

const Content: React.FC = () => {
  const [phase, setPhase] = useState(PHASES.ONBOARDING)
  const [question, setQuestion] = useState('')
  const [chats, setChats] = useState<any[]>([
    {
      role: 'system',
      content: TAROT_MASTER,
    },
  ])

  const [response, setResponse] = useState('')

  const handleSend = (input: string) => {
    const input_json = { role: 'user', content: input }
    setQuestion(input)
    setChats((prevChat) => [...prevChat, input_json])
    setPhase(PHASES.WAITING)
  }

  const handleGenAIResponse = async () => {
    try {
      const data = await requestOpenAI(chats)
      if (data) {
        setResponse(data.choices[0].message.content)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (question) handleGenAIResponse()
  }, [question])

  useEffect(() => {
    if (!!response) {
      setChats((prevChat) => [
        ...prevChat,
        { role: 'assistant', content: response },
      ])
    }
  }, [response])

  return (
    <div className="w-full flex-1 flex flex-col mx-4 mt-2">
      {phase === PHASES.ONBOARDING && <OnBoarding handleSend={handleSend} />}
      {phase === PHASES.WAITING && <Waiting setPhase={setPhase} />}
      {response && phase === PHASES.RESULT && (
        <Result chats={chats} setPhase={setPhase} setChats={setChats} />
      )}
    </div>
  )
}

export default Content
