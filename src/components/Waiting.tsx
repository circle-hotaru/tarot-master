import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

interface Props {
  setPhase: (phase: string) => void
}

const Waiting: React.FC<Props> = ({ setPhase }) => {
  const { t } = useTranslation('common')
  const [text, setText] = useState(t('waiting'))

  useEffect(() => {
    setTimeout(() => {
      setText(t('shuffling'))
    }, 2000)
  }, [])

  return (
    <div className="flex-1 flex justify-center items-center h-full">{text}</div>
  )
}

export default Waiting
