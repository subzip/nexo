import { ChatPreview } from '@/data/chatPreview'
import { ChatPreviewStore } from '@/store/chat.store'

export const formatChatsList = (chats: ChatPreview[]): ChatPreviewStore[] => {
  const formattedChats = chats.map((el) => {
    return {
      chatId: el.chatId,
      title: el.title,
      avatar: el.avatar || null,
      lastMessage: el.lastMessage?.text || null,
      lastMessageTime: el.lastMessageTime,
      unreadCount: el.unreadCount,
    }
  })

  return formattedChats
}
