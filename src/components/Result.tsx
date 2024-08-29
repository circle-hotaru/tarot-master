import { useState } from 'react'
import { Button } from 'antd'
import { requestOpenAI } from '~/apis/openai'
import { PHASES } from './Content'
import { TAROT_MASTER } from '~/constants'

interface Props {
  cards: string
  chats: any[]
  setPhase: (phase: string) => void
  setChats: (chat: any[]) => void
}

const Result: React.FC<Props> = ({ cards, chats, setPhase, setChats }) => {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [btnFlag, setBtnFlag] = useState('explain')

  const handleGenAIResponse = async () => {
    setLoading(true)
    const sendChats = chats
    const input_json = {
      role: 'user',
      content: '请结合牌的含义和前面提的问题为我进行解读和提供建议。',
    }
    sendChats.push(input_json)

    try {
      const aiResponse = await requestOpenAI(sendChats)
      setResponse(aiResponse)
      setLoading(false)
      setBtnFlag('reset')
    } catch (error) {
      console.error(error)
    }
  }

  const handleRest = () => {
    setPhase(PHASES.ONBOARDING)
  }

  const handleClick = () => {
    if (btnFlag === 'explain') {
      handleGenAIResponse()
    } else {
      setChats([
        {
          role: 'system',
          content: TAROT_MASTER,
        },
      ])
      handleRest()
    }
  }

  let btnText =
    btnFlag === 'explain'
      ? loading
        ? '解读中 🧙‍♀️'
        : '解读 🧙‍♀️'
      : '想要改变命运？🔮'

  return (
    <div className="flex-1  flex flex-col gap-4 justify-center items-start h-full whitespace-pre-wrap">
      <p>{cards}</p>
      <p>{response}</p>
      <Button
        type="primary"
        shape="round"
        onClick={handleClick}
        style={{
          alignSelf: 'center',
          backgroundColor: '#5a4186',
          color: '#f8fafc',
        }}
        loading={loading}
        disabled={loading}
      >
        {btnText}
      </Button>
    </div>
  )
}

export default Result
