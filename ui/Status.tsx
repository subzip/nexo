'use client'

import { useRelativeTime } from '@/features/chats/useRelativeTime'
import { usePresenceStore } from '@/store/presence.store'
import { useEffect } from 'react'

type Props = {
  participantId: string
}

const Status = ({ participantId }: Props) => {
  const statuses = usePresenceStore((state) => state.presenceByUserId)
  const status = statuses[participantId]
  const timeAgo = useRelativeTime(status?.lastSeen)

  return (
    <div>
      <p className={`${status?.online ? 'text-purple-800' : ''}`}>
        {status?.online ? 'online' : `last seen ${timeAgo}`}
      </p>
    </div>
  )
}

export default Status
