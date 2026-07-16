import { User } from '@/data/users'

export const login = async (username: string, password: string) => {
  const response = await fetch(`http://localhost:3000/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      username,
      password,
    }),
  })

  if (response.status === 200) return response.json()

  return null
}

export const getMe = async (userId: string): Promise<User | null> => {
  const response = await fetch(`http://localhost:3000/api/auth/me`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      userId,
    }),
  })

  if (response.status === 200) return response.json()

  return null
}
