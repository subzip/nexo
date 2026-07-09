import Image from "next/image"



const ChatItem = () => {
  return (
    <div className="flex gap-2 py-3 px-3 cursor-pointer">
      <Image src="/avatar.svg" alt="avatar" width={48} height={48} className="rounded-full" />
      <div>
        <p>Name</p>
            <span>I am texting u...</span>
      </div>
      
    </div>
  )
}

export default ChatItem
