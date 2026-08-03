import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRelativeTimeString = (
  date: Date | string,
  lang: string = 'en'
): string => {
  if (date === 'long time ago') return date
  const timeMs =
    date instanceof Date ? date.getTime() : new Date(date).getTime()
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)

  if (Math.abs(deltaSeconds) < 60) {
    return lang === 'ru' ? 'только что' : 'just now'
  }

  const cutoffs = [60, 3600, 86400, 604800, 2419200, 29030400, Infinity]
  const units = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ] as const

  const unitIndex = cutoffs.findIndex(
    (cutoff) => Math.abs(deltaSeconds) < cutoff
  )
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1

  const value = Math.round(deltaSeconds / divisor)

  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'always' })

  return rtf.format(value, units[unitIndex])
}
