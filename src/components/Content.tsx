import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { requestChatAI } from '~/apis/chatAI'
import { TAROT_MASTER } from '~/constants'
import OnBoarding from './OnBoarding'
import Waiting from './Waiting'
import Result from './Result'
import styles from './styles.module.css'
import { trackEvent } from '~/utils'

export const PHASES = {
  ONBOARDING: 'ONBOARDING',
  WAITING: 'WAITING',
  RESULT: 'RESULT',
}

const Content: React.FC = () => {
  const { t } = useTranslation('common')
  const [phase, setPhase] = useState(PHASES.ONBOARDING)
  const [question, setQuestion] = useState('')
  const [chats, setChats] = useState<any[]>([
    {
      role: 'system',
      content: `${TAROT_MASTER}${t('answer')}`,
    },
  ])

  const [response, setResponse] = useState('')

  const handleSend = (input: string) => {
    trackEvent('user_input', 'click', { input })
    const input_json = { role: 'user', content: input }
    setQuestion(input)
    setChats((prevChat) => [...prevChat, input_json])
    setPhase(PHASES.WAITING)
  }

  const handleGenAIResponse = async () => {
    try {
      const aiResponse = await requestChatAI(chats)
      setResponse(aiResponse)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (question) handleGenAIResponse()
  }, [question])

  useEffect(() => {
    if (!!response) {
      setPhase(PHASES.RESULT)
      setChats((prevChat) => [
        ...prevChat,
        { role: 'assistant', content: response },
      ])
    }
  }, [response])

  return (
    <div className="relative w-full flex-1 flex flex-col pb-6">
      <div className={`${styles.content} flex-1 flex flex-col px-4`}>
        {phase === PHASES.ONBOARDING && <OnBoarding handleSend={handleSend} />}
        {phase === PHASES.WAITING && <Waiting setPhase={setPhase} />}
        {response && phase === PHASES.RESULT && (
          <Result
            cards={response}
            chats={chats}
            setPhase={setPhase}
            setChats={setChats}
          />
        )}
      </div>
    </div>
  )
}

export default Content
