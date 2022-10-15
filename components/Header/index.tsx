import Nav from './nav'
import Logo from './logo'
const Header = () => {
  return (
    <header className="h-14 px-4 flex justify-between items-center border-b  border-border dark:border-dark-border">
      <Logo />
      <Nav />
    </header>
  )
}

export default Header
