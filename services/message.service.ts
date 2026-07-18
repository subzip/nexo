import { useMessageStore } from '@/store/message.store'
import { createMessage } from './message.api'
import { useChatPreviewStore } from '@/store/chat.store'

export const sendMessage = async (text: string) => {
  const chatId = useMessageStore.getState().currentChatId || ''

  const message = {
    chatId,
    text,
  }

  const response = await createMessage(message)

  if (!response) {
    console.log('msg error')
    return
  }

  useMessageStore.getState().addMessage(chatId, response)
  useChatPreviewStore
    .getState()
    .updateLastMessage(chatId, response.text, response.createdAt)
}
