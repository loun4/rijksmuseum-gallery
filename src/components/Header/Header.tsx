import { Search } from '@/components/Search'
import Logo from '@/assets/logo.png'
import './styles.scss'

export function Header() {
  return (
    <header className='Header'>
      <img src={Logo} alt='RijksData' title='RijksData' width='200' height='32' />
      <Search />
    </header>
  )
}
