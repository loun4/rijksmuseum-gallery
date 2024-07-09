import { useCallback, useState } from 'react'

type HandleSearchParamsChange = (query: Record<string, string | undefined>) => void

export function useURLSearchParams() {
  const [searchParams, setSearchParams] = useState(() => {
    const { searchParams } = new URL(window.location.href)
    return searchParams
  })

  const updateSearchParams = useCallback<HandleSearchParamsChange>((query) => {
    const url = new URL(window.location.href)

    Object.entries(query).forEach(([key, value]) => {
      if (typeof value === 'undefined') {
        url.searchParams.delete(key)
      } else {
        url.searchParams.set(key, value)
      }
    })

    setSearchParams(url.searchParams)
    window.history.replaceState({}, '', url.toString())
  }, [])

  return { searchParams, updateSearchParams }
}
