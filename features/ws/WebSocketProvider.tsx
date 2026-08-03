'use client'

import React, { createContext, useContext } from 'react'
import { useWebSocket } from './useWebSocket'

const WebSocketContext = createContext<{
  send: (payload: unknown) => void
} | null>(null)

export const WebSocketProvider = ({
  sessionId,
  children,
}: {
  sessionId: string
  children: React.ReactNode
}) => {
  const ws = useWebSocket(sessionId)

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  )
}

export const useWS = () => {
  const context = useContext(WebSocketContext)

  if (!context) {
    throw new Error('useWS must be used inside WebSocketProvider')
  }

  return context
}
