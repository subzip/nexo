import { TChatMessage } from './messages'

export type ChatPreview = {
  chatId: string
  title: string
  participantId: string
  avatar: string | null | undefined
  lastMessage: TChatMessage | null
  lastMessageTime: Date
  unreadCount: number
}
