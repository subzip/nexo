import { ChatPreview } from '@/data/chatPreview'
import { prisma } from '@/lib/prisma'

export const getChatPreviews = async (
  userId: string
): Promise<ChatPreview[]> => {
  const userChats = await prisma.chatParticipants.findMany({
    where: {
      userId,
    },
    include: {
      chat: {
        include: {
          participants: {
            include: {
              user: true,
            },
          },

          messages: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
      },
    },
  })

  const previews = userChats.map(({ chat }) => {
    const otherUser = chat.participants.find(
      (participant) => participant.userId !== userId
    )

    return {
      chatId: chat.id,
      title: chat.type === 'direct' ? otherUser?.user.username : chat.name,
      avatar: chat.type === 'direct' ? otherUser?.user.avatar : chat.avatar,
      lastMessage: chat.messages[0] ?? null,
      lastMessageTime: chat.messages[0].createdAt ?? chat.updatedAt,
      unreadCount: 0,
    }
  })

  return previews
}

export const getChatMessages = async (username1: string, username2: string) => {
  const chat = await prisma.chat.findFirst({
    where: {
      type: 'direct',

      participants: {
        some: {
          user: {
            username: username1,
          },
        },
      },

      AND: {
        participants: {
          some: {
            user: {
              username: username2,
            },
          },
        },
      },
    },

    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },

        include: {
          sender: {
            select: {
              username: true,
              avatar: true,
            },
          },
        },
      },
    },
  })

  if (!chat) return []

  return chat.messages
}
