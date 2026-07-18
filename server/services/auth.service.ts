import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export const findUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
      password,
    },
  })

  return user
}

export const getCurrentUser = async (sessionId: string) => {
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  })

  return session?.user ?? null
}

export const createSession = async (userId: string) => {
  return prisma.session.create({
    data: {
      userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  })
}

export const getSession = async (sessionId: string) => {
  return prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  })
}
