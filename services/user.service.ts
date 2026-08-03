import { findUserByUsername } from '@/server/repositories/user.repository'

export const getUserId = async (username: string) => {
  const user = await findUserByUsername(username)

  if (!user) return

  return user.id
}
