import Link from 'next/link'
import ChatItem from './ChatItem'
import { getChatPreview } from '@/services/chat.api'

const ChatList = async () => {
  const usersList = await getChatPreview('dc46cf3f-5a80-465d-965f-a5ebdbd995b3')

  return (
    <div className="border w-[25%] flex flex-col min-h-[80vh]">
      {usersList.map((el) => (
        <Link key={el.chatId} href={`/@${el.title}`}>
          <ChatItem
            chatId={el.chatId}
            title={el.title}
            avatar={el.avatar}
            lastMessage={el.lastMessage}
            lastMessageTime={el.lastMessageTime}
            unreadCount={el.unreadCount}
          />
        </Link>
      ))}
    </div>
  )
}

export default ChatList
