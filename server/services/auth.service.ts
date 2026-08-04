import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'
import {
  createUser,
  findUser,
  findUserByUsername,
} from '../repositories/user.repository'
import { createSession } from '../repositories/session.repository'

export const login = async (req: Request) => {
  const { username, password } = await req.json()

  const response = await findUserByUsername(username)
  if (!response) throw new Error('no user')

  const valid = await bcrypt.compare(password, response.password)

  if (!valid) throw new Error('Invalid credentials')

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

export const signup = async (req: Request) => {
  const { username, password } = await req.json()

  const response = await findUserByUsername(username)

  if (response) throw new Error('user exists')

  const user = await createUser(username, password)

  if (!user) throw new Error('user not created')

  const cookieStore = await cookies()

  const session = await createSession(user.id)

  cookieStore.set('auth', session.id, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  })

  return user
}
