import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from './index'

describe('Header', () => {
  it('render with logo', () => {
    const { getByAltText } = render(<Header />)
    expect(getByAltText('RijksData')).toBeDefined()
  })
})
