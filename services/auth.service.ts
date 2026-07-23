import { User } from '@/data/users'
import { getMe, login } from './auth.api'

export const loginService = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await login(username, password)
  console.log(response)
  return response
}

export const getCurrentUser = async (userId: string) => {
  const response = await getMe(userId)

  return response
}

export const connectToWS = async (
  socketRef: React.RefObject<WebSocket | null>,
  sessionId: string
) => {
  if (socketRef.current === null) return
  socketRef.current.onopen = (e) => {
    console.log(e)
    socketRef.current?.send(
      JSON.stringify({
        type: 'auth',
        data: {
          sessionId,
        },
      })
    )
  }
}
