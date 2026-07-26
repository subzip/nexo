import { useMessageStore } from '@/store/message.store'
import { createMessage } from '../lib/api/message.api'
import { useChatPreviewStore } from '@/store/chat.store'
import { TChatMessage } from '@/data/messages'

export const sendMessage = async (
  text: string,
  socketRef: React.RefObject<WebSocket | null>
) => {
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

  //sendMessageToWS(response, socketRef)

  addMessageToStore(response)
  return response
}

export const addMessageToStore = (response: TChatMessage) => {
  const chatId = useMessageStore.getState().currentChatId || ''

  useMessageStore.getState().addMessage(chatId, response)
  useChatPreviewStore
    .getState()
    .updateLastMessage(chatId, response.text, response.createdAt)
}

// export const sendMessageToWS = async (
//   message: TChatMessage,
//   socketRef: React.RefObject<WebSocket | null>
// ) => {
//   socketRef.current?.send(
//     JSON.stringify({
//       type: 'message',
//       data: {
//         message,
//       },
//     })
//   )
// }
