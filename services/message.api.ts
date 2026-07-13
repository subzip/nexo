import { MessageType } from "@/data/messages"




export const getChatMessages = async (username: string, currentUser: string):Promise<MessageType[]> => {
    const response = await fetch(`http://localhost:3000/api/messages?username=${username}&currentUser=${currentUser}`)

    if(response.status === 400)
        console.log("Error")

    return response.json()
}