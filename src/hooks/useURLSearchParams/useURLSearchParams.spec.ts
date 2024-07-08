import { act, renderHook } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { useURLSearchParams } from './useURLSearchParams'
import { describe } from 'node:test'
import { mockLocationHref } from '@/test-utils'

mockLocationHref('https://domain.com?name=test')

describe('useURLSearchParams', () => {
  it('init with current URL search params', () => {
    const { result } = renderHook(() => useURLSearchParams())
    const [searchParams] = result.current

    expect(searchParams.get('name')).toEqual('test')
  })

  it('update search params', async () => {
    const replaceStateSpy = vi.spyOn(window.history, 'replaceState')
    const { result } = renderHook(() => useURLSearchParams())
    const [, handleSearchParamsChange] = result.current

    act(() => {
      handleSearchParamsChange({ offset: '1', name: undefined })
    })

    const [updatedSearchParams] = result.current
    expect(updatedSearchParams.get('offset')).toEqual('1')
    expect(updatedSearchParams.get('name')).toBeNull()
    expect(replaceStateSpy).toHaveBeenCalledWith({}, '', 'https://domain.com/?offset=1')
  })
})
