import { useEffect, useState } from 'react'
import { PHASES } from './Content'

interface Props {
  setPhase: (phase: string) => void
}

const Waiting: React.FC<Props> = ({ setPhase }) => {
  const [text, setText] = useState(
    '好的，请您稍等片刻，我现在为您抽取三张随机的牌。'
  )

  useEffect(() => {
    setTimeout(() => {
      setText('（洗牌中 🔄）')
    }, 2000)
  }, [])

  return (
    <div className="flex-1 flex justify-center items-center h-full">{text}</div>
  )
}

export default Waiting
