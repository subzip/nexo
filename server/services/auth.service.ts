import { cookies } from 'next/headers'
import { findUser } from '../repositories/user.repository'
import { createSession } from '../repositories/session.repository'

export const login = async (req: Request) => {
  const { username, password } = await req.json()

  const response = await findUser(username, password)

  if (!response) throw new Error('no user')

  const cookieStore = await cookies()

  const session = await createSession(response.id)

  cookieStore.set('auth', session.id, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  })
  return response
}
