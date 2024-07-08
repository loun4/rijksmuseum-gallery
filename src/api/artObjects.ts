import { get, Query } from './client'

export type ArtObject = {
  longTitle: string
  id: string
  webImage: {
    url: string
  }
}

export type ArtObjects = {
  count: number
  artObjects: ArtObject[]
}

export async function getArtObjects(query?: Query) {
  return await get<ArtObjects>('/collection', query)
}
