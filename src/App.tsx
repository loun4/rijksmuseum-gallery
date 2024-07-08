import { Header } from '@/components/Header'
import { ArtObjects } from '@/components/ArtObjects'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
      <div className='layout'>
        <Header />
        <ArtObjects />
      </div>
    </QueryClientProvider>
  )
}

export default App
