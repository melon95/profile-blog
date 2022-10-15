import { useRouter } from 'next/router'

const Logo = () => {
  const { push } = useRouter()

  const goHome = () => {
    push('/')
  }
  return (
    <div
      className="cursor-pointer font-mono text-xl font-bold text-text dark:text-dark-text"
      onClick={goHome}>
      Idid
    </div>
  )
}

export default Logo
