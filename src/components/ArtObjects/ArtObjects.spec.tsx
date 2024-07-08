import { data, renderWithProviders } from '@/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ArtObjects } from './ArtObjects'
import { cleanup, fireEvent, waitFor } from '@testing-library/react'

describe('ArtObjects Component', () => {
  beforeEach(() => {
    data.forEach((response) => {
      fetchMock.mockResponseOnce(JSON.stringify(response))
    })
  })

  afterEach(() => {
    fetchMock.resetMocks()
    cleanup()
  })

  it('display spinner on loading', async () => {
    const { getByLabelText } = renderWithProviders(<ArtObjects />)
    await waitFor(() => expect(getByLabelText('loading')).toBeInTheDocument())
  })

  it('display title', async () => {
    const { queryByLabelText, getByText } = renderWithProviders(<ArtObjects />)

    await waitFor(() => expect(queryByLabelText('loading')).toBeNull())
    expect(getByText('35 works in Paris')).toBeInTheDocument()
  })

  it('display 20 items on initial render and load more button', async () => {
    const { asFragment, queryByLabelText, queryAllByAltText, queryAllByText, queryByText } = renderWithProviders(
      <ArtObjects />,
    )

    await waitFor(() => expect(queryByLabelText('loading')).toBeNull())

    expect(queryAllByAltText(/^longTitle-/)).toHaveLength(20) // Images
    expect(queryAllByText(/^longTitle-/)).toHaveLength(20) // Titles
    expect(queryByText(/Load more/)).toBeInTheDocument() // Load more button
    expect(asFragment()).toMatchSnapshot()
  })

  it('hide load more button when there is no more data to fetch', async () => {
    const { asFragment, queryByLabelText, queryByText, getByText } = renderWithProviders(<ArtObjects />)

    await waitFor(() => expect(queryByLabelText('loading')).toBeNull())
    await waitFor(() => fireEvent.click(getByText('Load more')))

    expect(queryByText(/Load more/)).toBeNull()
    expect(asFragment()).toMatchSnapshot()
  })
})
