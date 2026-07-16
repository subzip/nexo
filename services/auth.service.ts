import { User } from '@/data/users'
import { getMe, login } from './auth.api'

export const loginService = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await login(username, password)
  console.log(response)
  return response
}

export const getCurrentUser = async (userId: string) => {
  const response = await getMe(userId)

  return response
}
