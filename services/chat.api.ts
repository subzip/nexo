import { chatMembers } from '@/data/chatMembers'
import { ChatPreview } from '@/data/chatPreview'
import { Chat, chats } from '@/data/chats'

export const getUserChats = async (userId: number) => {
  // const chatMembersList = await chatMembers
  // const chatsList = await chats

  // const filteredChats = chatMembersList.filter(el => el.userId === userId)
  // const chatIds = new Set(filteredChats.map(el => el.chatId));
  // const userChats = chatsList.filter(chat => chatIds.has(chat.id));

  return []
}

export const getChatForTwoUsers = async (
  userId1: string,
  userId2: string
): Promise<string> => {
  // const chatMembersList = await chatMembers
  // const firstUserChats = chatMembersList.filter(el => el.userId === userId1)
  // const chatIds = new Set(firstUserChats.map(el => el.chatId))
  // const chat = chatMembersList.filter(el => el.userId === userId2 && chatIds.has(el.chatId))

  // return chat[0].chatId
  return '1'
}

export const getChatPreview = async (
  userId: string
): Promise<Array<ChatPreview>> => {
  const response = await fetch(
    `http://localhost:3000/api/chats?userId=${userId}`
  )

  if (response.status === 400) console.log('Error')

  return response.json()
}
