'use client'

import { ChatPreview } from '@/data/chatPreview'
import Link from 'next/link'
import React from 'react'
import ChatItem from './ChatItem'
import { useMessageStore } from '@/store/message.store'

type Props = {
  usersList: ChatPreview[]
}

const ChatListClient = ({ usersList }: Props) => {
  const setCurrentChatId = useMessageStore((state) => state.setCurrentChatId)

  return (
    <div className="border w-[25%] flex flex-col">
      {usersList.map((el) => (
        <Link key={el.chatId} href={`/@${el.title}`}>
          <ChatItem
            chatId={el.chatId}
            title={el.title}
            avatar={el.avatar}
            lastMessage={el.lastMessage}
            lastMessageTime={el.lastMessageTime}
            unreadCount={el.unreadCount}
            setCurrentChatId={setCurrentChatId}
          />
        </Link>
      ))}
    </div>
  )
}

export default ChatListClient
