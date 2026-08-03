'use client'

import { authWS, sendStatusToWS } from '@/services/auth.service'
import { addStatusToStore } from '@/services/chat.service'
import { useChatPreviewStore } from '@/store/chat.store'
import { useMessageStore } from '@/store/message.store'
import { usePresenceStore } from '@/store/presence.store'
import { WSMessage } from '@/websocket/types'
import { useCallback, useEffect, useRef } from 'react'

export const useWebSocket = (sessionId: string) => {
  const socketRef = useRef<WebSocket | null>(null)
  const addMessage = useMessageStore((state) => state.addMessage)
  const updateLastMessage = useChatPreviewStore(
    (state) => state.updateLastMessage
  )
  const setPresences = usePresenceStore((state) => state.setPresences)
  const setOnline = usePresenceStore((state) => state.setOnline)
  const setLastSeen = usePresenceStore((state) => state.setLastSeen)

  const send = useCallback((payload: unknown) => {
    const socket = socketRef.current

    if (!socket || socket.readyState !== WebSocket.OPEN) return

    socket.send(JSON.stringify(payload))
  }, [])

  useEffect(() => {
    if (!sessionId) return
    console.log('CREATE WS')
    const socket = new WebSocket('ws://localhost:8080')
    socketRef.current = socket

    socketRef.current.onopen = () => {
      authWS(socketRef, sessionId)
      sendStatusToWS(socketRef, true, null, sessionId)
    }

    socketRef.current.onmessage = (event) => {
      const payload: WSMessage = JSON.parse(event.data)
      console.log(payload)
      switch (payload.type) {
        case 'message':
          const msg = payload.data
          addMessage(msg.chatId, msg)
          updateLastMessage(msg.chatId, msg.text, msg.createdAt)
          break
        case 'presence:init':
          console.log(payload.data)
          const presences = Object.fromEntries(
            payload.data.map((el) => [
              el.userId,
              { online: el.online, lastSeen: el.lastSeen },
            ])
          )
          setPresences(presences)
          break
        case 'presence:update':
          setOnline(payload.data.userId, payload.data.online)
          setLastSeen(payload.data.userId, payload.data.lastSeen || '')
          break
      }
    }

    socketRef.current.onclose = () => {
      socketRef.current = null
    }

    return () => {
      socket.close()
      socketRef.current = null
    }
  }, [sessionId])

  return { send }
}
