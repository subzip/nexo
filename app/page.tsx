import ChatList from '@/features/chats/ChatsList'
import Header from '@/ui/Header'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session')

  if (!sessionId) redirect('/login')

  return (
    <div className="dark:bg-black pl-5">
      <Header />
      <main className="flex gap-12 ">
        <ChatList />
        <div className="border w-full"></div>
      </main>
    </div>
  )
}
