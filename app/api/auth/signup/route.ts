import { signup } from '@/server/services/auth.service'

export async function POST(req: Request) {
  try {
    const response = await signup(req)

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Not found' }, { status: 401 })
  }
}
