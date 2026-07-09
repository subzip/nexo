import { messages } from "@/data/messages"
import { getUserIdByUsername } from "./userService"



export const getMessagesForChatByUsername = async (username: string) => {
    const messagesAll = await messages
    const chatId = await getUserIdByUsername(username)

    const messagesChat = messagesAll
                                    .filter(el => el.chatId === chatId)
                                    .sort((a, b) => a.createdAt - b.createdAt)
    return messagesChat
}