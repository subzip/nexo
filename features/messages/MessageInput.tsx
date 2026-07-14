'use client'

import InputMessage from '@/ui/InputMessage'

const MessageInput = () => {
  return (
    <div className="border absolute bottom-0 mb-5 w-[45%] flex justify-center left-1/2 -translate-x-1/6  p-1  rounded-full bg-gray-800">
      <InputMessage />
    </div>
  )
}

export default MessageInput
