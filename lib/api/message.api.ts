import { MessageSend, TChatMessage } from '@/data/messages'
import { api } from './api'

export const getChatMessages = async (
  username: string
): Promise<TChatMessage[]> => {
  return await api<TChatMessage[]>(`/messages?username=${username}`, {
    method: 'GET',
  })
}

export const createMessage = async (
  message: MessageSend
): Promise<TChatMessage | null> => {
  return await api<TChatMessage>(`/messages`, {
    method: 'POST',
    body: JSON.stringify(message),
  })
}
