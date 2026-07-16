import ChatList from '@/features/chats/ChatsList'
import Header from '@/ui/Header'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('auth')

  console.log(userId)

  if (!userId) redirect('/login')

  return (
    <div className="dark:bg-black ml-70 mr-70">
      <Header />
      <main className="flex gap-12 mt-8">
        <ChatList />
        <div className="border w-full"></div>
      </main>
    </div>
  )
}
