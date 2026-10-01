import { getChatPreview } from '@/lib/api/chat.api'
import ChatListClient from './ChatListClient'

const ChatList = async () => {
  const chatPreviews = await getChatPreview()

  return <ChatListClient usersList={chatPreviews} />
}

export default ChatList
