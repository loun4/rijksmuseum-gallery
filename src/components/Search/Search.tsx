import './styles.scss'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import classNames from 'classnames'
import { useURLSearchParamsContext } from '@/hooks/useURLSearchParams'

export function Search() {
  const { searchParams, updateSearchParams } = useURLSearchParamsContext()

  const [name, setName] = useState(searchParams.get('q') || '')

  function handleClear() {
    setName('')
    updateSearchParams({ q: undefined })
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target

    if (value === '') {
      handleClear()
    } else {
      setName(value)
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    updateSearchParams({ q: name })
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
          placeholder='Search by title...'
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
