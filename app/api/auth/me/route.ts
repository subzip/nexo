import { getCurrentUser } from '@/server/services/auth.service'

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()

    const response = await getCurrentUser(sessionId)

    if (!response) throw new Error('no user')

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Not found' }, { status: 401 })
  }
}
