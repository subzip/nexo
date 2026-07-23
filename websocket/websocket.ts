import WebSocket, { WebSocketServer } from 'ws'
import { getCurrentUser, getSession } from '../server/services/auth.service'
import { MessageType } from '@/data/messages'
import { getParticipants } from '@/server/services/chat.service'

const userSockets = new Map<string, WebSocket>()

const socketUsers = new WeakMap<WebSocket, string>()

const wss = new WebSocketServer({
  port: 8080,
})

type Data = {
  sessionId?: string
  message?: MessageType
}

type Message = {
  type: string
  data: Data
}

wss.on('connection', (socket) => {
  console.log('Connected')

  socket.on('message', async (data) => {
    const payload: Message = JSON.parse(data.toString())
    console.log(payload)

    switch (payload.type) {
      case 'auth':
        const sessionId = payload.data.sessionId

        const session = await getSession(sessionId || '')

        userSockets.set(session?.userId || '', socket)
        socketUsers.set(socket, session?.userId || '')

        break
      case 'message':
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
  })

  socket.on('close', () => {
    const userId = socketUsers.get(socket)
    if (!userId) return
    userSockets.delete(userId)

    console.log('Disconnected')
  })
})
