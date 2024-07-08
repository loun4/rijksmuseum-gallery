import { Header } from '@/components/Header'
import { ArtObjects } from '@/components/ArtObjects'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { URLSearchParamsProvider } from './hooks/useURLSearchParams'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <URLSearchParamsProvider>
        <div className='layout'>
          <Header />
          <ArtObjects />
        </div>
      </URLSearchParamsProvider>
    </QueryClientProvider>
  )
}

export default App
