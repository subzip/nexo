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

export type PresenceInit = {
  type: 'presence:init'
  data: TPresence[]
}

export type PresenceUpdate = {
  type: 'presence:update'
  data: TPresence
}

export type WSMessage =
  AuthMessage | ChatMessage | PresenceMessage | PresenceInit | PresenceUpdate

export type TUser = {
  id: string
  username: string
  avatar: string | null
  lastSeen: Date | null
}
