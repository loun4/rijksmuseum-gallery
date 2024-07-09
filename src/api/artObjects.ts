import { get, Query } from './client'

export type ArtObject = {
  longTitle: string
  title: string
  id: string
  webImage: {
    url: string
  }
}

export type ArtObjects = {
  count: number
  artObjects: ArtObject[]
}

export function getArtObjects(query?: Query) {
  return get<ArtObjects>('/collection', query)
}
