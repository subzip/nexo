import { MessageSend } from '@/data/messages'
import { prisma } from '@/lib/prisma'

export const createMessage = async (message: MessageSend, senderId: string) => {
  return await prisma.message.create({
    data: {
      chatId: message.chatId,
      senderId,
      text: message.text,
    },
  })
}
