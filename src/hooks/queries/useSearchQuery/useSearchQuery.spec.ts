import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'
import { useSearchQuery } from '.'
import { QueryProvider } from '@/test-utils'

describe('useSearchQuery', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('call art objects endpoint with initial query string', () => {
    renderHook(() => useSearchQuery(), {
      wrapper: QueryProvider,
    })

    expect(fetchMock).toHaveBeenCalledWith(
      'https://www.rijksmuseum.nl/api/en/collection?key=123&ps=20&p=1&imgonly=true',
    )
  })

  it('should paginate and stop when all items are loaded', async () => {
    const data = [
      {
        count: 35,
        artObjects: Array.from({ length: 20 }, (_, index) => ({ id: index })),
      },
      {
        count: 35,
        artObjects: Array.from({ length: 15 }, (_, index) => ({ id: index + 20 })),
      },
    ]

    data.forEach((response) => {
      fetchMock.mockResponseOnce(JSON.stringify(response))
    })

    const { result } = renderHook(() => useSearchQuery(), {
      wrapper: QueryProvider,
    })

    async function waitForPagination(hasNextPage: boolean, expectedPagesSize: number) {
      await waitFor(() => expect(result.current.isFetching).toEqual(false))
      await waitFor(() => expect(hasNextPage).toEqual(hasNextPage))
      await waitFor(() => expect(result.current.data?.length).toEqual(expectedPagesSize))
    }

    // trigger first pagination
    result.current.fetchNextPage()
    await waitForPagination(true, 20)

    // trigger last pagination
    result.current.fetchNextPage()
    await waitForPagination(false, 35)
  })
})
