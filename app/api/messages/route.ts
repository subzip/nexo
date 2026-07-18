import { MessageSend } from '@/data/messages'
import { getCurrentUser } from '@/server/services/auth.service'
import { getChatMessages } from '@/server/services/chat.service'
import { createMessage } from '@/server/services/message.service'
import { cookies } from 'next/headers'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const currentUser = searchParams.get('currentUser')

  if (!username || !currentUser)
    return Response.json({ error: 'Missing usernames' }, { status: 400 })

  const messages = await getChatMessages(username, currentUser)

  return Response.json(messages)
}

export async function POST(req: Request) {
  try {
    const message: MessageSend = await req.json()
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('auth')?.value || ''

    const user = await getCurrentUser(sessionId)

    if (!message)
      return Response.json({ error: 'Missing message' }, { status: 400 })

    const response = await createMessage(message, user?.id || '')

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
