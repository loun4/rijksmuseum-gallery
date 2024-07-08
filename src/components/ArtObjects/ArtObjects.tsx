import { useSearchQuery } from '@/hooks/queries/useSearchQuery'
import { Card } from './Card'
import './styles.scss'
import { Spinner } from '@/components/Spinner'

export function ArtObjects() {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchQuery()

  if (status === 'pending') {
    return <Spinner className='ArtObjects-spinner' color='var(--primary-color)' size='48px' />
  }

  if (!data || data.length === 0) return <>No results</>

  return (
    <section className='ArtObjects'>
      <ul className='ArtObjects__list'>
        {data.map((item) => (
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
