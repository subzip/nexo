import { TChatMessage } from '@/data/messages'
import { create } from 'zustand'

type MessageInstance = {
  [chatId: string]: TChatMessage[]
}

type MessageStore = {
  messagesByChatId: MessageInstance
  currentChatId: string | null
  setCurrentChatId: (chatId: string) => void
  setMessagesByChatId: (chatId: string, messages: TChatMessage[]) => void
  addMessage: (chatId: string, message: TChatMessage) => void
}

export const useMessageStore = create<MessageStore>((set) => ({
  messagesByChatId: {},
  currentChatId: null,
  setCurrentChatId: (chatId: string) => {
    set({ currentChatId: chatId })
  },
  setMessagesByChatId: (chatId: string, messages: TChatMessage[]) => {
    set((state) => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [chatId]: messages,
      },
    }))
  },
  addMessage: (chatId: string, message: TChatMessage) => {
    set((state) => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [chatId]: [...(state.messagesByChatId[chatId] ?? []), message],
      },
    }))
  },
}))
