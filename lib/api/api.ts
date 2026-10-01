const BASE_URL = 'http://localhost:3000'

type CustomRequestInit = RequestInit & {}

export async function api<T>(
  endpoint: string,
  options: CustomRequestInit
): Promise<T> {
  const url = `${BASE_URL}/${endpoint.replace(/^\//, '')}`

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  const config: CustomRequestInit = {
    credentials: 'include',
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options?.headers ?? {}),
    },
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText)
    }

    if (response.status === 204) {
      return {} as T
    }

    return (await response.json()) as T
  } catch (error) {
    console.error(error)
    throw error
  }
}
