import 'server-only'

import { cookies } from 'next/headers'

const BASE_URL = 'http://localhost:3000'

export async function apiServer<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value

  const headers = new Headers(options.headers)

  headers.set('Content-Type', 'application/json')

  if (session) {
    headers.set('Cookie', `session=${session}`)
  }

  const response = await fetch(`${BASE_URL}/${endpoint.replace(/^\//, '')}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }

  if (response.status === 204) {
    return {} as T
  }

  return response.json() as Promise<T>
}
