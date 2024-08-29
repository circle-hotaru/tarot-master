import { useState, KeyboardEventHandler } from 'react'
import { useTranslation } from 'next-i18next'
import { Input, Button } from 'antd'

const { TextArea } = Input

interface Props {
  handleSend: (input: string) => void
}
const OnBoarding: React.FC<Props> = ({ handleSend }) => {
  const { t } = useTranslation('common')
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
        placeholder={t('placeholder')}
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
        }}
        disabled={!input}
      >
        {t('send')}
      </Button>
    </div>
  )
}

export default OnBoarding
