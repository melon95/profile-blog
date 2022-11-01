import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { HomeName } from './_app'

const list = [
  {
    label: 'React系列',
    router: 'react',
  },
  {
    label: 'Webpack系列',
    router: 'webpack',
  },
  {
    label: 'Mobx系列',
    router: 'mobx',
  },
  {
    label: 'JavaScript系列',
    router: 'js',
  },
  {
    label: 'Node系列',
    router: 'node',
  },
  {
    label: 'TypeScript系列',
    router: 'typescript',
  },
]

const Home: NextPage = () => {
  const { push } = useRouter()
  const linkTo = (route: string) => {
    push(`/${route}`)
  }
  return (
    <div>
      <div className="home-container mx-auto">
        {list.map((item) => (
          <div
            className="cursor-pointer bg-bg-soft dark:bg-dark-bg-soft flex justify-center items-center h-32 my-8 text-text dark:text-dark-text"
            onClick={() => linkTo(item.router)}
            key={item.router}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
Home.displayName = HomeName
export default Home
