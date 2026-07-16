'use client'

import { User } from '@/data/users'
import InputMessage from '@/ui/InputMessage'

type Props = {
  user: User | null
}

const MessageInput = ({ user }: Props) => {
  return (
    <div className="border absolute bottom-0 mb-5 w-[45%] flex justify-center left-1/2 -translate-x-1/6  p-1  rounded-3xl bg-gray-800">
      <InputMessage userId={user?.id || ''} />
    </div>
  )
}

export default MessageInput
