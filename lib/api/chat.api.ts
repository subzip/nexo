import { ChatPreview } from '@/data/chatPreview'

export const getChatPreview = async (
  userId: string
): Promise<Array<ChatPreview>> => {
  const response = await fetch(
    `http://localhost:3000/api/chats?userId=${userId}`
  )

  if (response.status === 400) console.log('Error')

  return response.json()
}
