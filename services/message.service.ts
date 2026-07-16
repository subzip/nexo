import { useMessageStore } from '@/store/message.store'
import { createMessage } from './message.api'

export const sendMessage = async (text: string, senderId: string) => {
  const chatId = useMessageStore.getState().currentChatId || ''

  const message = {
    chatId,
    senderId,
    text,
  }

  const response = await createMessage(message)

  if (!response) {
    console.log('msg error')
    return
  }

  useMessageStore.getState().addMessage(chatId, response)
}
