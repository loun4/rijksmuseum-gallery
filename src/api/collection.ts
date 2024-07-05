import { get, Query } from './client'

type ArtObject = {
  longTitle: string
  webImage: {
    url: string
  }
}

type Collection = {
  count: number
  artObjects: ArtObject[]
}

export function getCollection(query: Query) {
  return get<Collection>('/collection', query)
}
