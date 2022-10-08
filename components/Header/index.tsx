import Nav from './nav'
import Logo from './logo'
const Header = () => {
  return (
    <header className="h-14 px-4 flex justify-between items-center">
      <Logo />
      <Nav />
    </header>
  )
}

export default Header
