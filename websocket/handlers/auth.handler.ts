import { getSession } from '@/server/repositories/session.repository'
import { AuthMessage } from '../types'
import WebSocket from 'ws'
import { addSocket } from '..'
import { getContacts } from '@/server/repositories/presence.repository'
import { createPresenceSnapshot, sendPresenceOnline } from './presence.handler'

export const setAuth = async (
  payload: AuthMessage,
  socket: WebSocket,
  userSockets: Map<string, Set<WebSocket>>,
  socketUsers: WeakMap<WebSocket, string>,
  userContacts: Map<string, string[]>
) => {
  try {
    const sessionId = payload.sessionId
    if (!sessionId || sessionId.length === 0)
      throw new Error('sessionId not valid')

    const session = await getSession(sessionId || '')
    const userId = session?.userId || ''
    console.log('AUTH', userId)
    socketUsers.set(socket, userId)

    const contacts = await getContacts(userId)

    userContacts.set(
      userId,
      contacts.map((contact) => contact.id)
    )

    const snapshot = createPresenceSnapshot(contacts, userSockets)

    socket.send(
      JSON.stringify({
        type: 'presence:init',
        data: snapshot,
      })
    )

    const firstConnection = addSocket(session?.userId || '', socket)

    if (firstConnection) sendPresenceOnline(userId, userContacts, userSockets)
  } catch (error) {
    socket.close()
    console.error(error)
  }
}
