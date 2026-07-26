'use client'

import React from 'react'
import { useWebSocket } from './useWebSocket'

type Props = {
  sessionId: string
  children: React.ReactNode
}

const WebSocketProvider = ({ sessionId, children }: Props) => {
  useWebSocket(sessionId)
  return children
}

export default WebSocketProvider
