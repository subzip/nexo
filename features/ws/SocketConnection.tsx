'use client'

import { useEffect, useMemo } from 'react'
import { useAuthStore } from '@/store/auth.store'
import socket from '@/lib/socket'
import { useChatPreviewStore } from '@/store/chat.store'
import {
  addPresenceToStore,
  addStatusToStore,
  getPresence,
  joinChatRoomsWS,
} from '@/services/chat.service'
import type { TChatMessage } from '@/data/messages'
import { addMessageToStore } from '@/services/message.service'
import { ChatPresenceWS, UserPresence } from '@/data/chats'

export function SocketConnection() {
  const user = useAuthStore((state) => state.user)
  const chats = useChatPreviewStore((state) => state.chats)
  const chatIds = useMemo(() => chats.map((chat) => chat.chatId), [chats])

  useEffect(() => {
    if (!user) {
      socket.disconnect()
      return
    }

    if (!socket.connected) {
      socket.connect()
    }

    return () => {
      socket.disconnect()
    }
  }, [user])

  useEffect(() => {
    if (!user || chatIds.length === 0) {
      return
    }
    const fakeIds = ['fdsfsd', 'e3af55aa-319b-4b39-860f-2631627db7e1']
    const joinRooms = () => {
      joinChatRoomsWS(chatIds, socket)
    }

    if (socket.connected) {
      joinRooms()
    } else {
      socket.once('connect', joinRooms)
    }

    return () => {
      socket.off('connect', joinRooms)
    }
  }, [user, chatIds])

  useEffect(() => {
    const handleNewMessage = (message: TChatMessage) => {
      addMessageToStore(message)
    }

    socket.on('message:new', handleNewMessage)

    return () => {
      socket.off('message:new', handleNewMessage)
    }
  }, [])

  useEffect(() => {
    const handleConnect = () => {
      getPresence(socket)
    }

    const handlePresences = (presence: ChatPresenceWS[]) => {
      addPresenceToStore(presence)
    }

    const handlePresence = (presence: UserPresence) => {
      addStatusToStore(presence.userId, presence.online, presence.lastSeen)
    }

    if (socket.connected) {
      getPresence(socket)
    } else {
      socket.once('connect', handleConnect)
    }

    socket.on('presence:sync', handlePresences)
    socket.on('user:online', handlePresence)
    socket.on('user:offline', handlePresence)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('presence:sync', handlePresences)
      socket.off('user:online', handlePresence)
      socket.off('user:offline', handlePresence)
    }
  }, [])

  return null
}
