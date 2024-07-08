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

export function renderWithRQ(ui: React.ReactNode, renderOptions?: RenderOptions) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryProvider>{children}</QueryProvider>
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

function getItem(index: number) {
  return {
    id: index,
    longTitle: `longTitle-${index} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    webImage: {
      url: `image-${index}`,
    },
  }
}

export const data = [
  {
    count: 35,
    artObjects: Array.from({ length: 20 }, (_, index) => getItem(index)),
  },
  {
    count: 35,
    artObjects: Array.from({ length: 15 }, (_, index) => getItem(index + 20)),
  },
]
