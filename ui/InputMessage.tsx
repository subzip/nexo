import { sendMessage } from '@/services/message.service'
import React, { useEffect, useRef, useState } from 'react'

const InputMessage = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState('')
  const [containterHeight, setContainerHeight] = useState(0)

  useEffect(() => {
    const textarea = inputRef.current

    if (!textarea) return

    textarea.style.height = 'auto'

    textarea.style.height = `${textarea.scrollHeight}px`
    setContainerHeight(textarea.scrollHeight)
  }, [text])

  return (
    <div
      className={`flex w-full gap-15 justify-between max-h-100 items-end h-[${containterHeight}px]`}
    >
      <textarea
        autoCorrect="on"
        ref={inputRef}
        className={`text-xl max-h-100 font-bold ml-4 w-[80%] ${containterHeight < 400 ? 'overflow-hidden' : 'overflow-y-scroll'} focus:outline-none resize-none wrap-break-words pt-1`}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage(text)
            setText('')
          }
        }}
      />
      <div
        className="flex bg-purple-900 px-2.5 py-1 rounded-full cursor-pointer "
        onClick={() => {
          sendMessage(text)
          setText('')
        }}
      >
        {'>'}
      </div>
    </div>
  )
}

export default InputMessage
