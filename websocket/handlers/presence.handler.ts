import { User } from '@/data/users'
import { TUser } from '../types'
import WebSocket from 'ws'
import { setLastSeen } from '@/server/repositories/presence.repository'

export async function sendPresenceOnline(
  userId: string,
  userContacts: Map<string, string[]>,
  userSockets: Map<string, Set<WebSocket>>
) {
  const contacts = userContacts.get(userId)

  const user = await setLastSeen(userId, null)

  if (!contacts) return

  contacts.forEach((contactId) => {
    const sockets = userSockets.get(contactId)

    if (!sockets) return

    sockets.forEach((socket) => {
      socket.send(
        JSON.stringify({
          type: 'presence:update',
          data: {
            userId,
            online: true,
            lastSeen: null,
          },
        })
      )
    })
  })
}

export async function sendPresenceOffline(
  userId: string,
  userContacts: Map<string, string[]>,
  userSockets: Map<string, Set<WebSocket>>
) {
  const contacts = userContacts.get(userId)

  const user = await setLastSeen(userId, new Date())

  if (!contacts) return

  contacts.forEach((contactId) => {
    const sockets = userSockets.get(contactId)

    if (!sockets) return

    sockets.forEach((socket) => {
      socket.send(
        JSON.stringify({
          type: 'presence:update',
          data: {
            userId,
            online: false,
            lastSeen: new Date(),
          },
        })
      )
    })
  })
}

export const createPresenceSnapshot = (
  contacts: TUser[],
  userSockets: Map<string, Set<WebSocket>>
) => {
  return contacts.map((contact) => ({
    userId: contact.id,
    online: userSockets.has(contact.id),
    lastSeen: contact.lastSeen,
  }))
}
