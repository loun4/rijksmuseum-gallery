import { useSearchQuery } from '@/hooks/queries/useSearchQuery'
import { Card } from './Card'
import './styles.scss'
import { Spinner } from '@/components/Spinner'
import { useURLSearchParamsContext } from '@/hooks/useURLSearchParams'

export function ArtObjects() {
  const { searchParams } = useURLSearchParamsContext()
  const { data, status, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchQuery({
    query: {
      q: searchParams.get('q') ?? undefined,
    },
  })

  if (status === 'pending') {
    return <Spinner className='ArtObjects-spinner' color='var(--primary-color)' size='48px' />
  }

  if (!data || data.items.length === 0) return <>No results</>
  if (isError) return <>Something went wrong</>

  return (
    <section className='ArtObjects'>
      <h1 className='ArtObjects__title'>{data.count} works in Paris</h1>

      <ul className='ArtObjects__list'>
        {data.items.map((item) => (
          <Card key={item.id} item={item}>
            {item.longTitle}
          </Card>
        ))}
      </ul>
      {hasNextPage && (
        <button
          type='button'
          className='ArtObjects__load-more'
          onClick={() => {
            fetchNextPage()
          }}
        >
          {isFetchingNextPage ? <Spinner size='16' /> : 'Load more'}
        </button>
      )}
    </section>
  )
}
