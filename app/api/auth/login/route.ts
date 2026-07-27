import { createSession } from '@/server/repositories/session.repository'
import { findUser } from '@/server/repositories/user.repository'
import { login } from '@/server/services/auth.service'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const response = await login(req)

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Not found' }, { status: 401 })
  }
}
