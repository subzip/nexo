'use client'

import { ChatPreview } from '@/data/chatPreview'
import Link from 'next/link'
import React, { useEffect } from 'react'
import ChatItem from './ChatItem'
import { useMessageStore } from '@/store/message.store'
import { useChatPreviewStore } from '@/store/chat.store'
import { formatChatsList } from '@/services/chat.service'

type Props = {
  usersList: ChatPreview[]
}

const ChatListClient = ({ usersList }: Props) => {
  const setCurrentChatId = useMessageStore((state) => state.setCurrentChatId)
  const chatsList = useChatPreviewStore((state) => state.chats)
  const setChats = useChatPreviewStore((state) => state.setChats)

  useEffect(() => {
    setChats(formatChatsList(usersList))
  }, [usersList])

  return (
    <div className="border w-[25%] flex flex-col">
      {chatsList?.map((el) => (
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
