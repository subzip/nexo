import { TChatMessage } from '@/data/messages'

export type TPresence = {
  online: boolean
  lastSeen: string | null
  userId: string
}

export type AuthMessage = {
  type: 'auth'
  sessionId: string
}

export type ChatMessage = {
  type: 'message'
  data: TChatMessage
}

export type PresenceMessage = {
  type: 'presence'
  data: TPresence
}

export type WSMessage = AuthMessage | ChatMessage | PresenceMessage
