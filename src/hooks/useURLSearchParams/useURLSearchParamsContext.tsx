import { createContext, useContext } from 'react'
import { useURLSearchParams } from './useURLSearchParams'

const URLSearchParamsContext = createContext<ReturnType<typeof useURLSearchParams>>({
  searchParams: new URLSearchParams(),
  updateSearchParams: () => {},
})

// eslint-disable-next-line react-refresh/only-export-components
export function useURLSearchParamsContext() {
  return useContext(URLSearchParamsContext)
}

export function URLSearchParamsProvider({ children }: { children: React.ReactNode }) {
  const ctx = useURLSearchParams()
  return <URLSearchParamsContext.Provider value={ctx}>{children}</URLSearchParamsContext.Provider>
}
