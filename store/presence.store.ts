import { create } from 'zustand'

type PresenceInstance = {
  [userId: string]: {
    online: boolean
    lastSeen: string | null
  }
}

type PresenceStore = {
  presenceByUserId: PresenceInstance
  setPresences: (presences: PresenceInstance) => void
  setOnline: (userId: string, online: boolean) => void
  setLastSeen: (userId: string, lastSeen: string | null) => void
}

export const usePresenceStore = create<PresenceStore>((set) => ({
  presenceByUserId: {},
  setPresences: (presences: PresenceInstance) => {
    set({ presenceByUserId: presences })
  },
  setOnline: (userId: string, online: boolean) => {
    set((state) => ({
      presenceByUserId: {
        ...state.presenceByUserId,
        [userId]: {
          ...state.presenceByUserId[userId],
          online: online,
        },
      },
    }))
  },
  setLastSeen: (userId: string, lastSeen: string | null) => {
    set((state) => ({
      presenceByUserId: {
        ...state.presenceByUserId,
        [userId]: {
          ...state.presenceByUserId[userId],
          lastSeen: lastSeen,
        },
      },
    }))
  },
}))
