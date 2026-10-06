import { useMessageStore } from '@/store/message.store'
import socket from '@/lib/socket'

export const sendMessageWs = (text: string) => {
  const chatId = useMessageStore.getState().currentChatId

  if (!chatId) return

  const message = {
    chatId,
    content: text,
  }

  socket.emit('chat:send', message)
}
