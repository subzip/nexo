import { getMe } from '@/server/services/auth.service'

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()

    const response = await getMe(userId)

    if (!response) throw new Error('no user')

    // const cookieStore = await cookies()

    // cookieStore.set('auth', response.id, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'lax',
    //   path: '/',
    // })

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Not found' }, { status: 401 })
  }
}
