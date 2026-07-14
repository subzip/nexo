import { useMessageStore } from '@/store/message.store'
import { createMessage } from './message.api'

export const sendMessage = async (text: string) => {
  const senderId = 'dc46cf3f-5a80-465d-965f-a5ebdbd995b3'
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
