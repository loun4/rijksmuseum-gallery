import { getArtObjects, ArtObjects } from '@/api/artObjects'
import { Query } from '@/api/client'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

const PAGE_SIZE = 20
const STALE_TIME = 1000 * 60 * 5 // 5 minutes

function getFlattenArtObjects(data: ArtObjects[]) {
  return data.flatMap(({ artObjects }) => artObjects)
}

function selectArtObjects({ pages }: InfiniteData<ArtObjects, number>) {
  return {
    count: pages[0].count,
    items: getFlattenArtObjects(pages),
  }
}

export function useSearchQuery(query: Query = {}) {
  return useInfiniteQuery({
    staleTime: STALE_TIME,
    initialPageParam: 1,
    queryKey: ['search', query],
    queryFn: ({ pageParam }) => {
      return getArtObjects({
        ...query,
        ps: PAGE_SIZE,
        p: pageParam,
        imgonly: true,
        place: 'Paris',
        material: 'leather',
      })
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalItems = getFlattenArtObjects(allPages).length
      if (totalItems >= lastPage.count) return undefined
      return lastPageParam + 1
    },
    select: selectArtObjects,
  })
}
