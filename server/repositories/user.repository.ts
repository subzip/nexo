import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

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

export const createUser = async (username: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      username,
      password: await bcrypt.hash(password, 12),
    },
  })

  return user
}
