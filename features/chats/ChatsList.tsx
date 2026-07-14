import { getChatPreview } from '@/services/chat.api'

import ChatListClient from './ChatListClient'

const ChatList = async () => {
  const usersList = await getChatPreview('dc46cf3f-5a80-465d-965f-a5ebdbd995b3')

  return <ChatListClient usersList={usersList} />
}

export default ChatList
