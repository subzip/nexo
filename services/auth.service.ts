import { User } from '@/data/users'
import { login, signup } from '../lib/api/auth.api'

export const loginService = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await login(username, password)

  return response
}

export const singUpService = async (username: string, password: string) => {
  const response = await signup(username, password)
  return response
}

export const getCurrentUser = async (userId: string) => {
  const response = await getMe(userId)

  return response
}

export const authWS = async (
  socketRef: React.RefObject<WebSocket | null>,
  sessionId: string
) => {
  const socket = socketRef.current
  if (!socket) return

  const sendAuth = () => {
    socket.send(
      JSON.stringify({
        type: 'auth',
        sessionId,
      })
    )
  }

  if (socket.readyState === WebSocket.OPEN) sendAuth()
  else if (socket.readyState === WebSocket.CONNECTING) {
    socket.addEventListener('open', sendAuth, { once: true })
  }
}

export const sendStatusToWS = async (
  socketRef: React.RefObject<WebSocket | null>,
  online: boolean,
  lastSeen: string | null,
  sessionId: string
) => {
  const user = await getMe(sessionId)
  const socket = socketRef.current

  if (!user || !socket) return

  socket.send(
    JSON.stringify({
      type: 'presence',
      data: {
        online,
        lastSeen,
        userId: user.id,
      },
    })
  )
}
