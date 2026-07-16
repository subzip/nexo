import { MessageType } from '@/data/messages'

interface Props extends MessageType {
  userId: string
}

const Message = ({ text, createdAt, senderId, userId }: Props) => {
  const time = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(createdAt))

  return (
    <div
      className={`flex border rounded-2xl p-3 w-fit max-w-100 gap-2 h-fit ${senderId === userId ? 'bg-purple-800 self-end' : 'self-start'} my-2`}
    >
      <p className="text-[14px] font-bold">{text}</p>
      <span className="text-[10px] mt-[10%]">{time}</span>
    </div>
  )
}

export default Message
