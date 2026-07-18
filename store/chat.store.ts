import { MessageType } from '@/data/messages'
import { create } from 'zustand'

export type ChatPreviewStore = {
  chatId: string
  title: string
  avatar: string | null
  lastMessage: string | null
  lastMessageTime: Date
  unreadCount: number
}

type ChatStore = {
  chats: ChatPreviewStore[] | []

  setChats: (chatsPreview: ChatPreviewStore[]) => void
  updateLastMessage: (chatId: string, text: string, createdAt: Date) => void
  incrementUnread: (chatId: string) => void
  resetUnread: (chatId: string) => void
}

export const useChatPreviewStore = create<ChatStore>((set) => ({
  chats: [],
  setChats: (chatsPreview: ChatPreviewStore[]) => {
    set({ chats: chatsPreview })
  },
  updateLastMessage: (chatId: string, text: string, createdAt: Date) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.chatId === chatId
          ? {
              ...chat,
              lastMessage: text,
              lastMessageTime: createdAt,
            }
          : chat
      ),
    }))
  },
  incrementUnread: (chatId: string) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.chatId === chatId
          ? {
              ...chat,
              unreadCount: chat.unreadCount + 1,
            }
          : chat
      ),
    }))
  },
  resetUnread: (chatId: string) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.chatId === chatId
          ? {
              ...chat,
              unreadCount: 0,
            }
          : chat
      ),
    }))
  },
}))
