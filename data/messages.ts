

export type MessageType = {
    id: number;
    chatId: number;
    senderId: number;
    text: string;
    createdAt: number;
    updatedAt: number;
}


export const messages: Array<MessageType> = [
    // Chat 1
    {
        id: 1,
        chatId: 1,
        senderId: 1,
        text: "Привет 👋",
        createdAt: 1710000001,
        updatedAt: 1710000001
    },
    
    {
        id: 3,
        chatId: 1,
        senderId: 1,
        text: "Как дела?",
        createdAt: 1710000003,
        updatedAt: 1710000003
    },
    {
        id: 2,
        chatId: 1,
        senderId: 2,
        text: "Привет!",
        createdAt: 1710000002,
        updatedAt: 1710000002
    },
    {
        id: 4,
        chatId: 1,
        senderId: 2,
        text: "Все отлично 😄",
        createdAt: 1710000004,
        updatedAt: 1710000004
    },
    {
        id: 5,
        chatId: 1,
        senderId: 2,
        text: "А у тебя?",
        createdAt: 1710000005,
        updatedAt: 1710000005
    },
    {
        id: 6,
        chatId: 1,
        senderId: 1,
        text: "Тоже нормально, решил написать свой мессенджер.",
        createdAt: 1710000006,
        updatedAt: 1710000006
    },

    // Chat 2
    {
        id: 7,
        chatId: 2,
        senderId: 2,
        text: "Ты сегодня свободен?",
        createdAt: 1710000100,
        updatedAt: 1710000100
    },
    {
        id: 8,
        chatId: 2,
        senderId: 1,
        text: "После работы да.",
        createdAt: 1710000101,
        updatedAt: 1710000101
    },
    {
        id: 9,
        chatId: 2,
        senderId: 2,
        text: "Тогда созвонимся 👍",
        createdAt: 1710000102,
        updatedAt: 1710000102
    },
    {
        id: 10,
        chatId: 2,
        senderId: 1,
        text: "Окей.",
        createdAt: 1710000103,
        updatedAt: 1710000103
    }
];