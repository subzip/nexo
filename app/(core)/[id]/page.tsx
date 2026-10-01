import MessageInput from '@/features/messages/MessageInput'
import MessagesClient from '@/features/messages/MessagesClient'
import { getUserId } from '@/services/user.service'
import Status from '@/ui/Status'
import { apiServer } from '@/lib/api/api.server'
import type { TChatMessage } from '@/data/messages'

type PageProps = {
  params: Promise<{ id: string }>
}

const Chat = async ({ params }: PageProps) => {
  const { id } = await params
  const username = id.slice(3)
  console.log(username)
  const participantId = getUserId(username)

  const messages = await apiServer<TChatMessage[]>(
    `/messages?username=${username}`,
    {
      method: 'GET',
    }
  )

  return (
    <div className="border w-full py-3 pl-5 flex flex-col h-full flex-1 min-h-0">
      <div className="gap-5 ml-62">
        <p className="text-4xl">{username}</p>
        <Status participantId={participantId || ''} />
      </div>

      <MessagesClient messages={messages} participantId={participantId || ''} />
      <MessageInput />
    </div>
  )
}

export default Chat
