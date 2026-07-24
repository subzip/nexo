import WebSocket, { WebSocketServer } from 'ws'
import { Message } from './types'
import { setAuth } from './handlers/auth.handler'
import { sendMessageToUser } from './handlers/message.handler'

const userSockets = new Map<string, WebSocket>()

const socketUsers = new WeakMap<WebSocket, string>()

const wss = new WebSocketServer({
  port: 8080,
})

wss.on('connection', (socket) => {
  console.log('Connected')

  socket.on('message', async (data) => {
    const payload: Message = JSON.parse(data.toString())

    switch (payload.type) {
      case 'auth':
        await setAuth(payload, userSockets, socketUsers, socket)
        break
      case 'message':
        await sendMessageToUser(payload, userSockets)
        break
    }
  })

  socket.on('close', () => {
    const userId = socketUsers.get(socket)
    if (!userId) return
    userSockets.delete(userId)

    console.log('Disconnected')
  })
})
