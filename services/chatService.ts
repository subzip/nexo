import { chatMembers } from "@/data/chatMembers"
import { chats } from "@/data/chats"


export  const getUserChats = async (userId: number) => {

    const chatMembersList = await chatMembers
    const chatsList = await chats

    const filteredChats = chatMembersList.filter(el => el.userId === userId)
    const chatIds = new Set(filteredChats.map(el => el.chatId));
    const userChats = chatsList.filter(chat => chatIds.has(chat.id));

    return userChats
    
}

