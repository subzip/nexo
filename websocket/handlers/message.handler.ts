import { getParticipants } from '@/server/services/chat.service'
import { Message } from '../types'
import WebSocket from 'ws'

export const sendMessageToUser = async (
  payload: Message,
  userSockets: Map<string, WebSocket>
) => {
  if (!payload.data.message) return
  const chatId = payload.data.message.chatId

  const participants = await getParticipants(chatId)
  const addressIds = participants.filter(
    (el) => el.userId !== payload.data.message?.senderId
  )

  addressIds.forEach((el) => {
    const addressSocket = userSockets.get(el.userId)
    if (!addressSocket) return

    addressSocket.send(
      JSON.stringify({ type: 'message', data: payload.data.message })
    )
  })
}
