

export type ChatMembers = { //db
    id: number;
    userId: number;
    chatId: number;
    role: 'owner' | 'member';
    joinedAt: number
}

export const chatMembers: Array<ChatMembers> = [
    {
        id: 1,
        userId: 1,
        chatId: 1,
        role: 'member',
        joinedAt: 13232432
    },
    {
        id: 2,
        userId: 2,
        chatId: 1,
        role: 'member',
        joinedAt: 13232432
    },
    {
        id: 3,
        userId: 1,
        chatId: 2,
        role: 'member',
        joinedAt: 13232432
    },
    {
        id: 4,
        userId: 3,
        chatId: 2,
        role: 'member',
        joinedAt: 13232432
    },
]