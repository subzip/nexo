import { getChatPreview } from '@/lib/api/chat.api'

import ChatListClient from './ChatListClient'
import { cookies } from 'next/headers'
import { getMe } from '@/lib/api/auth.api'

const ChatList = async () => {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('auth') || { value: '' }
  const me = await getMe(sessionId.value)
  const usersList = await getChatPreview(me?.id || '')

  return <ChatListClient usersList={usersList} />
}

export default ChatList
