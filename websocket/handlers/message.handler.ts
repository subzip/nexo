import { getParticipants } from '@/server/repositories/chat.repositoty'
import { ChatMessage } from '../types'
import WebSocket from 'ws'

export const sendMessageToUser = async (
  payload: ChatMessage,
  userSockets: Map<string, Set<WebSocket>>
) => {
  if (!payload.data) return
  const chatId = payload.data.chatId

  const participants = await getParticipants(chatId)
  const addressIds = participants.filter(
    (el) => el.userId !== payload.data.senderId
  )

  addressIds.forEach((el) => {
    const addressSocket = userSockets.get(el.userId)
    if (!addressSocket) return

    addressSocket.forEach((socket) => {
      console.log('Send to', el.userId, 'connections:', addressSocket.size)
      socket.send(JSON.stringify({ type: 'message', data: payload.data }))
    })
  })
}
