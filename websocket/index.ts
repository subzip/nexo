import WebSocket, { WebSocketServer } from 'ws'
import { WSMessage } from './types'
import { setAuth } from './handlers/auth.handler'
import { sendMessageToUser } from './handlers/message.handler'
import { sendPresenceOffline } from './handlers/presence.handler'

const userSockets = new Map<string, Set<WebSocket>>()

const socketUsers = new WeakMap<WebSocket, string>()

const userContacts = new Map<string, string[]>()

const wss = new WebSocketServer({
  port: 8080,
})

export function addSocket(userId: string, socket: WebSocket) {
  let sockets = userSockets.get(userId)

  const firstConnection = !sockets

  if (!sockets) {
    sockets = new Set<WebSocket>()
    userSockets.set(userId, sockets)
  }

  sockets.add(socket)

  return firstConnection
}

export function removeSocket(userId: string, socket: WebSocket) {
  const sockets = userSockets.get(userId)

  if (!sockets) return false

  sockets.delete(socket)

  if (sockets.size === 0) {
    userSockets.delete(userId)
    return true
  }

  return false
}

wss.on('connection', (socket) => {
  console.log('Connected')

  socket.on('message', async (data) => {
    const payload: WSMessage = JSON.parse(data.toString())

    switch (payload.type) {
      case 'auth':
        await setAuth(payload, socket, userSockets, socketUsers, userContacts)
        break
      case 'message':
        await sendMessageToUser(payload, userSockets)
        break
      case 'presence':
    }
    console.log(userSockets.size)
  })

  socket.on('close', () => {
    const userId = socketUsers.get(socket)
    if (!userId) return
    const becameOffline = removeSocket(userId, socket)

    if (!becameOffline) return
    sendPresenceOffline(userId, userContacts, userSockets)

    console.log('Disconnected')
  })
})
