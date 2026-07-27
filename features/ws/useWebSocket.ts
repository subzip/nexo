'use client'

import { authWS, sendStatusToWS } from '@/services/auth.service'
import { addStatusToStore } from '@/services/chat.service'
import { useChatPreviewStore } from '@/store/chat.store'
import { useMessageStore } from '@/store/message.store'
import { WSMessage } from '@/websocket/types'
import { useCallback, useEffect, useRef } from 'react'

export const useWebSocket = (sessionId: string) => {
  const socketRef = useRef<WebSocket | null>(null)
  const addMessage = useMessageStore((state) => state.addMessage)
  const updateLastMessage = useChatPreviewStore(
    (state) => state.updateLastMessage
  )

  const send = useCallback((payload: unknown) => {
    const socket = socketRef.current
    console.log(payload)
    if (!socket || socket.readyState !== WebSocket.OPEN) return

    socket.send(JSON.stringify(payload))
  }, [])

  useEffect(() => {
    if (!sessionId) return
    const socket = new WebSocket('ws://localhost:8080')
    socketRef.current = socket

    authWS(socketRef, sessionId)

    sendStatusToWS(socketRef, true, null, sessionId)

    socket.onmessage = (event) => {
      const payload: WSMessage = JSON.parse(event.data)
      console.log(payload)
      switch (payload.type) {
        case 'message':
          const msg = payload.data
          addMessage(msg.chatId, msg)
          updateLastMessage(msg.chatId, msg.text, msg.createdAt)
          break
        case 'presence':
          console.log(payload.data)
      }
    }

    socket.onclose = () => {
      socketRef.current = null
    }

    // return () => {
    //   socket.close()
    //   socketRef.current = null
    // }
  }, [sessionId, addMessage, updateLastMessage])

  return { send }
}
