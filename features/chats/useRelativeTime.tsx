import { getRelativeTimeString } from '@/lib/utils'
import { useEffect, useState } from 'react'

export const useRelativeTime = (
  date: Date | string | null,
  lang: string = 'en'
) => {
  const [relativeTime, setRelativeTime] = useState(() =>
    getRelativeTimeString(date || 'long time ago', lang)
  )

  useEffect(() => {
    if (!date) return
    const updateTime = () => {
      setRelativeTime(getRelativeTimeString(date, lang))
    }

    updateTime()

    const intervalId = setInterval(updateTime, 60000)

    return () => clearInterval(intervalId)
  }, [date, lang])

  return relativeTime
}
