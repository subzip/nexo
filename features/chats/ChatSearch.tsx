'use client'

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const ChatSearch = () => {
  const [search, setSearch] = useState('')
  return (
    <div>
      <Input
        className="w-100"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default ChatSearch
