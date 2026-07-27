export type TChatMessage = {
  id: string
  chatId: string
  senderId: string
  text: string
  createdAt: Date
  updatedAt: Date
}

export type MessageSend = {
  chatId: string
  text: string
}
