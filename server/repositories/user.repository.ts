import { prisma } from '@/lib/prisma'

export const findUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
      password,
    },
  })

  return user
}

export const findUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  return user
}
