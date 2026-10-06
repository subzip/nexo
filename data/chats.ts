export type Chat = {
  //db
  id: string
  type: 'direct' | 'group'
  name: string | null
  avatar: string | null
  lastMessage: string
  createdAt: Date
  updatedAt: Date
}

export type ChatPresenceWS = {
  chatId: string
  users: UserPresence[]
}

export type UserPresence = {
  userId: string
  online: boolean
  lastSeen: string | null
}
