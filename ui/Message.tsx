

// {
//         id: 2,
//         chatId: 1,
//         senderId: 2,
//         text: "Привет!",
//         createdAt: 1710000002,
//         updatedAt: 1710000002
//     },

import { MessageType } from "@/data/messages"

const Message = ({text, createdAt, senderId, }: MessageType) => {

    const userId = 1
    const time = new Date(createdAt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  return (
    <div className={`flex border rounded-2xl p-3 w-fit max-w-100 gap-2 h-fit ${senderId === userId ? 'bg-purple-800 self-end' : 'self-start'} my-2`} >
      <p className="text-[14px] font-bold">{text}</p>
      <span className="text-[10px] mt-[10%]">{time}</span>
    </div>
  )
}

export default Message
