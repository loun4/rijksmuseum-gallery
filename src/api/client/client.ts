const baseURL = `${import.meta.env.VITE_API_BASE_URL}`

export type Query = {
  q?: string
  p?: number
  ps?: number
  imgonly?: boolean
  place?: string
  material?: string
}

function stringifyQuery(query?: Query) {
  if (!query) return
  return Object.entries(query).reduce((acc, [key, value]) => {
    if (typeof value === 'undefined') return acc
    return {
      ...acc,
      [key]: String(value),
    }
  }, {})
}

function getURL(endpoint: string, query?: Query) {
  const search = new URLSearchParams({
    key: import.meta.env.VITE_API_KEY,
    ...stringifyQuery(query),
  })

  return `${baseURL}${endpoint}?${search.toString()}`
}

export async function get<T>(endpoint: string, query?: Query) {
  const res = await fetch(getURL(endpoint, query))
  const data = (await res.json()) as Promise<T>
  return data
}
