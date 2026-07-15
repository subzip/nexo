'use client'

import { MessageType } from '@/data/messages'
import { useMessageStore } from '@/store/message.store'
import Message from '@/ui/Message'
import React, { useEffect, useLayoutEffect, useRef } from 'react'

type Props = {
  messages: MessageType[]
}

const MessagesClient = ({ messages }: Props) => {
  const msgRef = useRef<HTMLDivElement>(null)
  const chatId = messages.length !== 0 ? messages[0].chatId : ''
  const setCurrentChatId = useMessageStore((state) => state.setCurrentChatId)
  const setMessagesByChatId = useMessageStore(
    (state) => state.setMessagesByChatId
  )

  const msgs = useMessageStore((state) => state.messagesByChatId[chatId])

  useEffect(() => {
    setMessagesByChatId(chatId, messages)
    setCurrentChatId(chatId)
  }, [chatId, messages])

  useLayoutEffect(() => {
    msgRef.current?.scrollIntoView()
  }, [msgs])

  return (
    <div
      className="messages 
      flex flex-col mt-10 px-15 pr-57.5 pl-61 pb-12 scrollbar-thin scrollbar-thumb-slate-400 
      scrollbar-track-slate-100 scrollbar-thumb-rounded-full hover:scrollbar-thumb-slate-500
      flex-1 overflow-y-auto min-h-0 scrollbar-gutter-stable "
    >
      {msgs?.map((el) => (
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
      <div ref={msgRef} />
    </div>
  )
}

export default MessagesClient
