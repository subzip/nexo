'use client'

import { ChatPreview } from '@/data/chatPreview'
import Link from 'next/link'
import React, { useEffect } from 'react'
import ChatItem from './ChatItem'
import { useMessageStore } from '@/store/message.store'
import { useChatPreviewStore } from '@/store/chat.store'
import { formatChatsList } from '@/services/chat.service'
import { useAuthStore } from '@/store/auth.store'
import { getMe } from '@/lib/api/auth.api'

type Props = {
  usersList: ChatPreview[]
}

const ChatListClient = ({ usersList }: Props) => {
  const setCurrentChatId = useMessageStore((state) => state.setCurrentChatId)
  const chatsList = useChatPreviewStore((state) => state.chats)
  const setChats = useChatPreviewStore((state) => state.setChats)

  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    setChats(formatChatsList(usersList))
  }, [usersList])

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMe()
      if (!user) return
      setUser(user)
    }
    fetchUser()
  }, [])

  return (
    <div className="border w-[25%] flex flex-col">
      {chatsList?.map((el) => (
        <Link key={el.chatId} href={`/@${el.title}`}>
          <ChatItem
            chatId={el.chatId}
            title={el.title}
            participantId={el.participantId}
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
