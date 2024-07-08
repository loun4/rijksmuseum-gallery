/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions } from '@testing-library/react'

export function mockLocationHref(url = 'https://domain.com') {
  Object.defineProperty(window, 'location', {
    value: {
      href: url,
    },
    writable: true,
  })
}

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = makeQueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export function renderWithRQ(ui: React.ReactNode, renderOptions: RenderOptions) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryProvider>{children}</QueryProvider>
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}
