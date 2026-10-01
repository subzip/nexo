import { ChatPreview } from '@/data/chatPreview'

import { apiServer } from './api.server'

export const getChatPreview = async (): Promise<ChatPreview[]> => {
  return await apiServer<ChatPreview[]>(`/conversations/preview`, {
    method: 'GET',
  })
}
