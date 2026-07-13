import { users } from "@/data/users"



export const getUserIdByUsername = async (username: string) => {
    const usersAll = await users

    return usersAll.find(el => el.username === username)?.id
}