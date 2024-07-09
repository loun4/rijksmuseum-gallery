import { ArtObject } from '@/api/artObjects'
import './styles.scss'
import classNames from 'classnames'
import { useState } from 'react'

type Props = {
  item: ArtObject
  children: React.ReactNode
}

export function Card({ item }: Props) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  return (
    <li className='Card' tabIndex={0}>
      <figure>
        <img
          alt={item.title}
          className={classNames('Card__image', {
            'Card__image--isLoaded': isLoaded,
          })}
          loading='lazy'
          src={item.webImage.url.replace('=s0', '')} // prevent loading original image
          onLoad={handleImageLoad}
        />

        <figcaption className='Card__title'>
          <span>{item.longTitle}</span>
        </figcaption>
      </figure>
    </li>
  )
}
