

export type Chat = {
    id: number;
    type: "direct" | "group";
    name: string | null;
    avatar: string | null;
    lastMessage: string;
    createdAt: number;
    updatedAt: number;
}


export const chats: Array<Chat> = [
    {
        id: 1,
        type: "direct",
        name: "chat with diemiradie",
        avatar: '/avatar.svg',
        lastMessage: 'hi',
        createdAt: 12375348,
        updatedAt: 132234432
    },
    {
        id: 2,
        type: "direct",
        name: "chat with sdsds",
        avatar: '/avatar.svg',
        lastMessage: 'test',
        createdAt: 12375348,
        updatedAt: 132234432
    },
    {
        id: 3,
        type: "direct",
        name: null,
        avatar: null,
        lastMessage: 'fdsfsd',
        createdAt: 12375348,
        updatedAt: 132234432
    },
]