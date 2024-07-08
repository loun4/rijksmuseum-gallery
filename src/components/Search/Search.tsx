import './styles.scss'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import classNames from 'classnames'
import { useURLSearchParams } from '@/hooks/useURLSearchParams'

export function Search() {
  const [searchParams, setSearchParams] = useURLSearchParams()
  const [name, setName] = useState(searchParams.get('q') || '')

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function handleClear() {
    setName('')
    setSearchParams({ q: undefined })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSearchParams({ q: name })
  }

  return (
    <form className='Search' onSubmit={handleSubmit}>
      <div className='Search__inputWrapper'>
        <input
          type='text'
          className={classNames('Search__input', {
            'Search__input--hasValue': name.length > 0,
          })}
          value={name}
          onChange={handleNameChange}
          placeholder='Search...'
          aria-label='Search'
        />
        {name.length > 0 && (
          <FaTimes
            tabIndex={0}
            aria-label='Clear search'
            role='button'
            className='Search__inputClear'
            onClick={handleClear}
          />
        )}
      </div>

      <input type='submit' className='Search__submit' value='Submit' disabled={name.length === 0} />
    </form>
  )
}
