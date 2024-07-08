import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Header } from './index'

describe('Header', () => {
  afterEach(cleanup)

  it('render', () => {
    const { asFragment } = render(<Header />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('render with logo', () => {
    const { getByAltText } = render(<Header />)
    expect(getByAltText('RijksData')).toBeInTheDocument()
  })
})
