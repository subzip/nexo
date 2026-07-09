import { Chat } from "@/data/chats"
import Image from "next/image"



const ChatItem = ({id, name, avatar, createdAt, updatedAt, type, lastMessage}: Chat) => {
  return (
    <div className="flex gap-2 py-3 px-3 cursor-pointer">
      <Image src={avatar || ""} alt="avatar" width={56} height={56} className="rounded-full" />
      <div>
        <p className="text-2xl font-bold">{name}</p>
            <span>{lastMessage}</span>
      </div>
      
    </div>
  )
}

export default ChatItem
