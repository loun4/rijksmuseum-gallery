import { getArtObjects, ArtObjects } from '@/api/artObjects'
import { Query } from '@/api/client'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

type UseSearchQueryArgs = {
  query?: Query
}

const PAGE_SIZE = 20

function getFlattenArtObjects(data: ArtObjects[]) {
  return data.flatMap(({ artObjects }) => artObjects)
}

function selectArtObjects({ pages }: InfiniteData<ArtObjects, number>) {
  return getFlattenArtObjects(pages)
}

export function useSearchQuery({ query }: UseSearchQueryArgs = {}) {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['search', query],
    queryFn: ({ pageParam }) => {
      return getArtObjects({
        ...query,
        ps: PAGE_SIZE,
        p: pageParam,
        imgonly: true,
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
