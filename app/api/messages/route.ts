import { getChatMessages } from "@/server/services/chat.service"


export async function GET(
  req: Request,
) {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get("username")
    const currentUser = searchParams.get("currentUser")

    if(!username || !currentUser)
        return Response.json({error: "Missing usernames"}, {status: 400})

    const messages = await getChatMessages(username, currentUser)

    return Response.json(messages)
}