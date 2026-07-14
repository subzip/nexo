import { MessageSend } from '@/data/messages'
import { prisma } from '@/lib/prisma'

export const createMessage = async (message: MessageSend) => {
  return await prisma.message.create({
    data: {
      chatId: message.chatId,
      senderId: message.senderId,
      text: message.text,
    },
  })
}
