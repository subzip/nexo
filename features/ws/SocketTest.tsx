'use client'

import { useEffect } from 'react'
import socket from '@/lib/socket'

export function SocketTest() {
  useEffect(() => {
    socket.connect()

    const onConnect = () => {
      console.log('Socket connected:', socket.id)
    }

    const onConnectError = (error: Error) => {
      console.error('Socket connection error:', error.message)
    }

    const onDisconnect = (reason: string) => {
      console.log('Socket disconnected:', reason)
    }

    socket.on('connect', onConnect)
    socket.on('connect_error', onConnectError)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('connect_error', onConnectError)
      socket.off('disconnect', onDisconnect)

      socket.disconnect()
    }
  }, [])

  return null
}
