export type User = {
  //db
  id: string
  username: string
  password: string
  avatar: string
  createdAt: Date
  updatedAt: Date
}

export type SearchUser = {
  id: string
  username: string
  avatar: string | null
  online: boolean
}
