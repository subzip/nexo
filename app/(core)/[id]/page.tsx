import MessageInput from '@/features/messages/MessageInput'
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
      <div
        className="messages flex flex-col mt-10 px-15 pr-57.5 pl-61 pb-12
                    scrollbar-thin 
                    scrollbar-thumb-slate-400 
                    scrollbar-track-slate-100 
                    scrollbar-thumb-rounded-full 
                    hover:scrollbar-thumb-slate-500
                    flex-1 overflow-y-auto min-h-0 scrollbar-gutter-stable 
                    "
      >
        {messages.map((el) => (
          <Message
            key={el.id}
            id={el.id}
            chatId={el.chatId}
            updatedAt={el.updatedAt}
            text={el.text}
            createdAt={el.createdAt}
            senderId={el.senderId}
          />
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

export default Chat
