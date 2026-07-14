import { MessageSend } from '@/data/messages'
import { getChatMessages } from '@/server/services/chat.service'
import { createMessage } from '@/server/services/message.service'

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

    if (!message)
      return Response.json({ error: 'Missing message' }, { status: 400 })

    const response = await createMessage(message)

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
