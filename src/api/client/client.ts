const baseURL = `${import.meta.env.VITE_API_BASE_URL}`

export type Query = {
  q?: string
  p?: string
  ps?: string
}

function getURL(endpoint: string, query?: Query) {
  const search = new URLSearchParams({
    key: import.meta.env.VITE_API_KEY,
    ...query,
  })

  return `${baseURL}${endpoint}?${search.toString()}`
}

export async function get<T>(endpoint: string, query?: Query) {
  const res = await fetch(getURL(endpoint, query))
  const data = (await res.json()) as Promise<T>
  return data
}
