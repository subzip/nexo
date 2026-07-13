import { getChatMessages } from "@/services/message.api";
import Message from "@/ui/Message";


type PageProps = {
  params: Promise<{ id: string }>;
};

const Chat = async ({params} : PageProps) => {

  const { id } = await params
  const messages = await getChatMessages(id, "subzip")


  return (
    <div className="border w-full py-3 px-5">
      <p className="text-4xl">{id}</p>
      <div className="messages flex flex-col mt-30 px-15 ">
        {messages.map(el => (
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
    </div>
  )
}

export default Chat
