import { prisma } from '@/lib/prisma'

export const getContacts = async (userId: string) => {
  const chats = await prisma.chatParticipants.findMany({
    where: {
      userId,
    },
    include: {
      chat: {
        include: {
          participants: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  avatar: true,
                  lastSeen: true,
                },
              },
            },
          },
        },
      },
    },
  })

  const contacts = new Map<
    string,
    {
      id: string
      username: string
      avatar: string | null
      lastSeen: Date | null
    }
  >()

  chats.forEach((chat) => {
    chat.chat.participants.forEach((participant) => {
      if (participant.user.id !== userId) {
        contacts.set(participant.user.id, participant.user)
      }
    })
  })

  return [...contacts.values()]
}

export const setLastSeen = async (userId: string, lastSeen: Date | null) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lastSeen,
    },
  })

  return user
}
