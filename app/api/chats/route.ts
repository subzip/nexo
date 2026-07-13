import { getChatPreviews } from '@/server/services/chat.service'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) return Response.json({ error: 'Missing id' }, { status: 400 })

  const chats = await getChatPreviews(userId)

  return Response.json(chats)
}
