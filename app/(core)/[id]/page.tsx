import MessageInput from '@/features/messages/MessageInput'
import MessagesClient from '@/features/messages/MessagesClient'
import { getChatMessages } from '@/services/message.api'
import Message from '@/ui/Message'

type PageProps = {
  params: Promise<{ id: string }>
}

const Chat = async ({ params }: PageProps) => {
  const { id } = await params
  const username = id.slice(3)
  const messages = await getChatMessages(username, 'subzip')

  return (
    <div className="border w-full py-3 pl-5 flex flex-col h-full flex-1 min-h-0">
      <p className="text-4xl">{username}</p>
      <MessagesClient messages={messages} />
      <MessageInput />
    </div>
  )
}

export default Chat
