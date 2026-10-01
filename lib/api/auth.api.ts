import { User } from '@/data/users'
import { api } from './api'

export const login = async (username: string, password: string) => {
  return await api<User>(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  })
}

export const signup = async (username: string, password: string) => {
  return await api<User>(`/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  })
}

export const getMe = async (): Promise<Pick<
  User,
  'id' | 'username' | 'avatar'
> | null> => {
  return await api<Pick<User, 'id' | 'username' | 'avatar'>>(`/auth/me`, {
    method: 'GET',
  })
}
