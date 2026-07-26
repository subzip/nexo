import { getSession } from '@/server/repositories/session.repository'
import { AuthMessage } from '../types'
import WebSocket from 'ws'

export const setAuth = async (
  payload: AuthMessage,
  userSockets: Map<string, WebSocket>,
  socketUsers: WeakMap<WebSocket, string>,
  socket: WebSocket
) => {
  try {
    const sessionId = payload.sessionId
    if (!sessionId || sessionId.length === 0)
      throw new Error('sessionId not valid')

    const session = await getSession(sessionId || '')

    userSockets.set(session?.userId || '', socket)
    socketUsers.set(socket, session?.userId || '')
  } catch (error) {
    socket.close()
    console.error(error)
  }
}
