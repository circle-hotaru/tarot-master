import { useState } from 'react'
import { Button } from 'antd'
import { requestOpenAI } from '~/apis/openai'
import { PHASES } from './Content'
import { TAROT_MASTER } from '~/constants'

interface Props {
  chats: any[]
  setPhase: (phase: string) => void
  setChats: (chat: any[]) => void
}

const Result: React.FC<Props> = ({ chats, setPhase, setChats }) => {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [btnFlag, setBtnFlag] = useState('explain')

  const cards = chats.find((chat) => chat.role === 'assistant')

  const handleGenAIResponse = async () => {
    setLoading(true)
    const input_json = {
      role: 'user',
      content: '请结合牌的含义和前面提的问题为我进行解读和提供建议。',
    }
    chats.push(input_json)
    try {
      const data = await requestOpenAI(chats)
      if (data) {
        setResponse(data.choices[0].message.content)
        setLoading(false)
        setBtnFlag('reset')
      }
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
    btnFlag === 'explain' ? (loading ? '解读中 🧙‍♀️' : '解读 🧙‍♀️') : '再来一次 🃏'

  return (
    <div className="flex-1  flex flex-col gap-4 justify-center items-start h-full whitespace-pre-wrap">
      <p>{cards?.content}</p>
      <p>{response}</p>
      <Button
        type="primary"
        shape="round"
        onClick={handleClick}
        style={{
          alignSelf: 'center',
          backgroundColor: '#3875f6',
          color: '#f8fafc',
          cursor: 'not-allowed',
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
