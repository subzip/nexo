import { ChatPreview } from '@/data/chatPreview'
import Image from 'next/image'

interface Props extends ChatPreview {
  setCurrentChatId: (chatId: string) => void
}

const ChatItem = ({
  chatId,
  title,
  avatar,
  lastMessage,
  lastMessageTime,
  unreadCount,
  setCurrentChatId,
}: Props) => {
  return (
    <div
      className="flex gap-2 py-3 px-3 cursor-pointer"
      onClick={() => setCurrentChatId(chatId)}
    >
      <Image
        src={avatar || ''}
        alt="avatar"
        width={56}
        height={56}
        className="rounded-full"
      />
      <div>
        <p className="text-2xl font-bold">{title}</p>
        <div className="flex justify-between w-40">
          <span>
            {lastMessage?.text.slice(0, 10)}
            {(lastMessage?.text.length || ''.length) > 10 ? '...' : ''}
          </span>
          <span className="bg-purple-800 rounded-full px-2">{unreadCount}</span>
        </div>
      </div>
    </div>
  )
}

export default ChatItem
