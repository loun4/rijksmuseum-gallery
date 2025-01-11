import { useCallback, useEffect, useState } from 'react'

type HandleSearchParamsChange = (query: Record<string, string | undefined>) => void

const SEARCH_PARAMS_CHANGED = 'searchParamsChanged'

export function useURLSearchParams() {
  const [searchParams, setSearchParams] = useState(() => new URL(window.location.href).searchParams)

  useEffect(() => {
    const handleSearchParamsChange = ({ detail }: CustomEventInit<URLSearchParams>) => {
      if (detail) setSearchParams(detail)
    }

    window.addEventListener(SEARCH_PARAMS_CHANGED, handleSearchParamsChange)
    return () => window.removeEventListener(SEARCH_PARAMS_CHANGED, handleSearchParamsChange)
  }, [])

  const updateSearchParams = useCallback<HandleSearchParamsChange>((query) => {
    const url = new URL(window.location.href)

    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined) {
        url.searchParams.delete(key)
      } else {
        url.searchParams.set(key, value)
      }
    })

    const searchParamsChangeEvent = new CustomEvent(SEARCH_PARAMS_CHANGED, { detail: url.searchParams })
    window.dispatchEvent(searchParamsChangeEvent)
    window.history.replaceState({}, '', url.toString())
  }, [])

  return { searchParams, updateSearchParams }
}
