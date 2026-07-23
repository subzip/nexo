import MessageInput from '@/features/messages/MessageInput'
import MessagesClient from '@/features/messages/MessagesClient'
import { getMe } from '@/services/auth.api'
import { getChatMessages } from '@/services/message.api'
import { cookies } from 'next/headers'

type PageProps = {
  params: Promise<{ id: string }>
}

const Chat = async ({ params }: PageProps) => {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('auth')?.value || ''
  const { id } = await params
  const username = id.slice(3)
  const me = await getMe(sessionId)

  console.log(me)

  const messages = await getChatMessages(username, me?.username || '')

  return (
    <div className="border w-full py-3 pl-5 flex flex-col h-full flex-1 min-h-0">
      <p className="text-4xl">{username}</p>
      <MessagesClient messages={messages} user={me} />
      <MessageInput user={me} sessionId={sessionId} />
    </div>
  )
}

export default Chat
