import ChatSearch from '@/features/chats/ChatSearch'

const Header = () => {
  return (
    <header className="flex gap-111.5 bg-gray-950 p-3 align-center justify-start">
      <p className="text-3xl text-fuchsia-900">Nexo</p>
      <ChatSearch />
    </header>
  )
}

export default Header
