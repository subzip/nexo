import Link from "next/link"
import ChatItem from "./ChatItem"

const ChatList = () => {
  return (
    <div className="border w-[25%] flex flex-col min-h-[80vh]">
      <Link href="/subzip"><ChatItem/></Link>
      <Link href="/diemiradie"><ChatItem/></Link>
      <Link href="/fd"><ChatItem/></Link>
      <Link href="/fdsfds"><ChatItem/></Link>
    </div>
  )
}

export default ChatList
