import { useChatPreviewStore } from '@/store/chat.store'

export const getUserId = (username: string) => {
  const user =
    useChatPreviewStore.getState().chats.find((el) => el.title === username) ||
    ''
  if (!user) return

  return user.participantId
}
