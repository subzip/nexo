import { MessageType } from '@/data/messages'
import { create } from 'zustand'

type MessageInstance = {
  [chatId: string]: MessageType[]
}

type MessageStore = {
  messagesByChatId: MessageInstance
  currentChatId: string | null
  setCurrentChatId: (chatId: string) => void
  setMessagesByChatId: (chatId: string, messages: MessageType[]) => void
  addMessage: (chatId: string, message: MessageType) => void
}

export const useMessageStore = create<MessageStore>((set) => ({
  messagesByChatId: {},
  currentChatId: null,
  setCurrentChatId: (chatId: string) => {
    set({ currentChatId: chatId })
  },
  setMessagesByChatId: (chatId: string, messages: MessageType[]) => {
    set((state) => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [chatId]: messages,
      },
    }))
  },
  addMessage: (chatId: string, message: MessageType) => {
    set((state) => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [chatId]: [...(state.messagesByChatId[chatId] ?? []), message],
      },
    }))
  },
}))
