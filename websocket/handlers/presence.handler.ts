import { getPresenceContacts } from '@/server/repositories/chat.repositoty'
import { getSession } from '@/server/repositories/session.repository'
import WebSocket from 'ws'

export const setPresenceSubscribers = async (
  presenceSubscribers: Map<string, Set<string>>,
  sessionId: string
) => {
  const session = await getSession(sessionId)
  if (!session) return
  const contacts = await getPresenceContacts(session.userId)

  presenceSubscribers.set(
    session.userId,
    new Set(contacts.map((el) => el.userId))
  )
}

export const sendPresenceToSubscribers = (
  presenceSubscribers: Map<string, Set<string>>,
  userId: string,
  userSockets: Map<string, WebSocket>,
  status: boolean,
  lastSeen: string | null
) => {
  const subscribers = presenceSubscribers.get(userId)

  if (!subscribers) return

  subscribers.forEach((el) => {
    if (!userSockets.get(el)) return

    userSockets.get(el)?.send(
      JSON.stringify({
        type: 'presence',
        data: {
          userId,
          online: status,
          lastSeen,
        },
      })
    )
  })
}
