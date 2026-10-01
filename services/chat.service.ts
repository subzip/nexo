import { ChatPreview } from '@/data/chatPreview'
import { ChatPreviewStore, useChatPreviewStore } from '@/store/chat.store'
import { usePresenceStore } from '@/store/presence.store'

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

export const addStatusToStore = (
  userId: string,
  online: boolean,
  lastSeen: string | null
) => {
  const setOnline = usePresenceStore.getState().setOnline
  const setLastSeen = usePresenceStore.getState().setLastSeen

  setOnline(userId, online)
  if (lastSeen) setLastSeen(userId, lastSeen)
}

export const getChatId = (username: string) => {
  const chat = useChatPreviewStore
    .getState()
    .chats.find((chat) => chat.title === username)
  return chat?.chatId
}
