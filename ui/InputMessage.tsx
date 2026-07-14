import { sendMessage } from '@/services/message.service'
import React, { useState } from 'react'

const InputMessage = () => {
  const [text, setText] = useState('')

  return (
    <div className="flex w-full gap-15 justify-between">
      <textarea
        className="text-xl font-bold ml-5 w-[80%] focus:outline-none resize-none wrap-break-words pt-1"
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div
        className="flex bg-purple-900 px-2.5 py-1 rounded-full cursor-pointer"
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
