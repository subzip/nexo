import { MessageType } from '@/data/messages'

export type Data = {
  sessionId?: string
  message?: MessageType
}

export type Message = {
  type: string
  data: Data
}
