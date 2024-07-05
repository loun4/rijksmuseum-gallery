import { beforeEach, describe, expect, it } from 'vitest'
import { get } from './index'

describe('api client', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('get', () => {
    it('should build correct url with api key and query string', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: [] }))
      await get('/collection', { q: 'name' })

      const expectedURL = `${import.meta.env.VITE_API_BASE_URL}/collection?key=${import.meta.env.VITE_API_KEY}&q=name`
      expect(fetch).toHaveBeenCalledWith(expectedURL)
    })

    it('should resolve data', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: [] }))
      const data = await get('/collection', { q: 'name' })
      expect(data).toEqual({ data: [] })
    })
  })
})
