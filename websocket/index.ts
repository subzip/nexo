import WebSocket, { WebSocketServer } from 'ws'
import { WSMessage } from './types'
import { setAuth } from './handlers/auth.handler'
import { sendMessageToUser } from './handlers/message.handler'
import {
  sendPresenceToSubscribers,
  setPresenceSubscribers,
} from './handlers/presence.handler'

const userSockets = new Map<string, WebSocket>()

const socketUsers = new WeakMap<WebSocket, string>()

const presenceSubscribers = new Map<string, Set<string>>()

const wss = new WebSocketServer({
  port: 8080,
})

wss.on('connection', (socket) => {
  console.log('Connected')

  socket.on('message', async (data) => {
    const payload: WSMessage = JSON.parse(data.toString())

    switch (payload.type) {
      case 'auth':
        await setAuth(payload, userSockets, socketUsers, socket)
        await setPresenceSubscribers(presenceSubscribers, payload.sessionId)
        break
      case 'message':
        await sendMessageToUser(payload, userSockets)
        break
      case 'presence':
        await sendPresenceToSubscribers(
          presenceSubscribers,
          payload.data.userId,
          userSockets,
          payload.data.online,
          payload.data.lastSeen
        )
    }
    console.log(userSockets.size)
  })

  socket.on('close', () => {
    const userId = socketUsers.get(socket)
    if (!userId) return
    userSockets.delete(userId)

    console.log('Disconnected')
  })
})
