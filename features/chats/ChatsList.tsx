import Link from "next/link"
import ChatItem from "./ChatItem"
import { getUserChats } from "@/services/chatService"

const ChatList = async () => {
  const usersList = await getUserChats(1)

  return (
    <div className="border w-[25%] flex flex-col min-h-[80vh]">
      {usersList.map(el => (
        <Link key={el.id} href={`/${el.name}`}>
          <ChatItem 
            id={el.id}
            name={el.name}
            avatar={el.avatar}
            type={el.type}
            lastMessage={el.lastMessage}
            createdAt={el.createdAt}
            updatedAt={el.updatedAt}
          />
          </Link>
      ))}
    </div>
  )
}

export default ChatList
