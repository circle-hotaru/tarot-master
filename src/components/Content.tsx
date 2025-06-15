import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { SYSTEM_PROMPT, TAROT_CARDS } from '~/constants'
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
      content: `${SYSTEM_PROMPT} ${t('answer_in_the_specified_language')}`,
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

  const handleDrawCards = () => {
    const tarotCards = [...TAROT_CARDS]
    const resultCards: string[] = []
    for (let i = 0; i < 3; i++) {
      const idx = Math.floor(Math.random() * tarotCards.length)
      const cardKey = tarotCards.splice(idx, 1)[0]
      const card = t(`cards.${cardKey}`)
      const orientation =
        Math.random() < 0.5 ? t('upright') : t('reversed')
      resultCards.push(
        `${i + 1}. ${card} (${orientation})${i === 2 ? '.' : ';'}`,
      )
    }
    const result = `${t('drawCardsPrefix')}\n\n${resultCards.join('\n\n')}`
    setResponse(result)
  }

  useEffect(() => {
    if (question) handleDrawCards()
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
    <div className="relative flex w-full flex-1 flex-col pb-6">
      <div className={`${styles.content} flex flex-1 flex-col px-4`}>
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
