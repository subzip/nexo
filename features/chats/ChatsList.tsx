import { getChatPreview } from '@/services/chat.api'

import ChatListClient from './ChatListClient'
import { cookies } from 'next/headers'

const ChatList = async () => {
  const cookieStore = await cookies()
  const userId = cookieStore.get('auth') || { value: '' }
  const usersList = await getChatPreview(userId.value)

  return <ChatListClient usersList={usersList} />
}

export default ChatList
