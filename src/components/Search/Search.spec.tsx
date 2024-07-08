import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Search } from './index'
import { mockLocationHref } from '@/test-utils'

describe('Search', () => {
  afterEach(cleanup)

  it('render', () => {
    const { asFragment } = render(<Search />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('populate input name from search params on first render', () => {
    mockLocationHref('https://domain.com?q=Portrait')
    const { getByDisplayValue, getByLabelText } = render(<Search />)

    expect(getByDisplayValue('Portrait')).toBeInTheDocument()
    expect(getByLabelText('Clear search')).toBeInTheDocument()
  })

  it('disable submit button and clear text icon if the input is empty', async () => {
    mockLocationHref()
    const { getByText, queryByLabelText } = render(<Search />)

    expect(getByText(/Submit/i)).toHaveAttribute('disabled')
    expect(queryByLabelText('Clear search')).toBeNull()
  })

  it('update url search params on submit', async () => {
    const replaceStateSpy = vi.spyOn(window.history, 'replaceState')
    const { getByLabelText, getByText } = render(<Search />)

    fireEvent.change(getByLabelText('Search'), { target: { value: 'Cabinet' } })
    fireEvent.click(getByText(/Submit/i))
    expect(replaceStateSpy).toHaveBeenCalledWith({}, '', 'https://domain.com/?q=Cabinet')
  })
})
