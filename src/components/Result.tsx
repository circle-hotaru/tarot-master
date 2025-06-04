import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Button } from 'antd'
import { requestChatAI } from '~/apis/chatAI'
import { PHASES } from './Content'
import { SYSTEM_PROMPT } from '~/constants'

interface Props {
  cards: string
  chats: any[]
  setPhase: (phase: string) => void
  setChats: (chat: any[]) => void
}

const Result: React.FC<Props> = ({ cards, chats, setPhase, setChats }) => {
  const { t } = useTranslation('common')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [btnFlag, setBtnFlag] = useState('explain')

  const handleGenAIResponse = async () => {
    setLoading(true)
    const sendChats = chats
    const input_json = {
      role: 'user',
      content: t('interpret_prompt'),
    }
    sendChats.push(input_json)

    try {
      const aiResponse = await requestChatAI(sendChats)
      setResponse(aiResponse)
      setLoading(false)
      setBtnFlag('reset')
    } catch (error) {
      console.error(error)
    }
  }

  const handleReset = () => {
    setPhase(PHASES.ONBOARDING)
  }

  const handleClick = () => {
    if (btnFlag === 'explain') {
      handleGenAIResponse()
    } else {
      setChats([
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
      ])
      handleReset()
    }
  }

  let btnText =
    btnFlag === 'explain'
      ? loading
        ? t('interpreting')
        : t('interpret')
      : t('retry')

  return (
    <div className="flex h-full flex-1 flex-col items-start justify-center gap-4 whitespace-pre-wrap">
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
