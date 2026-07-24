import { getSession } from '@/server/services/auth.service'
import { Message } from '../types'
import WebSocket from 'ws'

export const setAuth = async (
  payload: Message,
  userSockets: Map<string, WebSocket>,
  socketUsers: WeakMap<WebSocket, string>,
  socket: WebSocket
) => {
  try {
    const sessionId = payload.data.sessionId

    const session = await getSession(sessionId || '')

    userSockets.set(session?.userId || '', socket)
    socketUsers.set(socket, session?.userId || '')
  } catch (error) {
    socket.close()
    console.error(error)
  }
}
