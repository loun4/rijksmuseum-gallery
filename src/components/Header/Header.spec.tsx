import { cleanup, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from './index'

describe('Header', () => {
  it('render', () => {
    const { asFragment } = render(<Header />)
    expect(asFragment()).toMatchSnapshot()
    cleanup()
  })

  it('render with logo', () => {
    const { getByAltText } = render(<Header />)
    expect(getByAltText('RijksData')).toBeInTheDocument()
  })
})
