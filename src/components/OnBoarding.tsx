import { useState, KeyboardEventHandler } from 'react'
import { Input, Button } from 'antd'

const { TextArea } = Input

interface Props {
  handleSend: (input: string) => void
}
const OnBoarding: React.FC<Props> = ({ handleSend }) => {
  const [input, setInput] = useState('')

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (input.length === 0) return
      handleSend(input)
    } else if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault()
      setInput(input + '\n')
    }
  }

  return (
    <div className="flex-1 flex flex-nowrap gap-2 justify-center items-center h-full">
      <TextArea
        placeholder="我最近的运势怎么样？"
        autoSize={{ minRows: 1, maxRows: 6 }}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        autoFocus
        allowClear
        onPressEnter={handleKeyDown}
        className="w-full flex-1"
      />
      <Button
        type="primary"
        onClick={() => handleSend(input)}
        style={{
          alignSelf: 'center',
          backgroundColor: '#5a4186',
          color: '#f8fafc',
          cursor: 'not-allowed',
        }}
        disabled={!input}
      >
        发送
      </Button>
    </div>
  )
}

export default OnBoarding
