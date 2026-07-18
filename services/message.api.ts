import { MessageSend, MessageType } from '@/data/messages'

export const getChatMessages = async (
  username: string,
  currentUser: string
): Promise<MessageType[]> => {
  const response = await fetch(
    `http://localhost:3000/api/messages?username=${username}&currentUser=${currentUser}`
  )

  if (response.status === 400) console.log('Error')

  return response.json()
}

export const createMessage = async (
  message: MessageSend
): Promise<MessageType | null> => {
  const response = await fetch(`http://localhost:3000/api/messages`, {
    method: 'POST',
    body: JSON.stringify(message),
  })

  if (response.status === 200) return response.json()

  return null
}
