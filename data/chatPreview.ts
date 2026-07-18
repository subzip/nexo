import { MessageType } from './messages'

export type ChatPreview = {
  chatId: string
  title: string
  avatar: string | null | undefined
  lastMessage: MessageType | null
  lastMessageTime: Date
  unreadCount: number
}

// export const chatPreviews: Array<ChatPreview> = [
//     {
//         chatId: 1,
//         title: "diemiradie",
//         avatar: "/avatar.svg",
//         lastMessage: {
//             id: 6,
//             chatId: 1,
//             senderId: 1,
//             text: "Тоже нормально, решил написать свой мессенджер.",
//             createdAt: 1710000006,
//             updatedAt: 1710000006
//         },
//         lastMessageTime: 172345345,
//         unreadCount: 2
//     },
//     {
//         chatId: 2,
//         title: "dsds",
//         avatar: "/avatar.svg",
//         lastMessage: {
//             id: 10,
//             chatId: 2,
//             senderId: 1,
//             text: "Окей.",
//             createdAt: 1710000103,
//             updatedAt: 1710000103
//         },
//         lastMessageTime: 172345345,
//         unreadCount: 3
//     }
// ]
