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
]

const Home: NextPage = () => {
  const { push } = useRouter()
  const linkTo = (route: string) => {
    push(`/${route}`)
  }
  return (
    <div className="grid grid-cols-3 gap-8 place-content-center">
      {list.map((item) => (
        <div
          style={{
            border: '1px solid #ccc',
          }}
          className="cursor-pointer flex justify-center items-center h-48"
          onClick={() => linkTo(item.router)}
          key={item.router}>
          {item.label}
        </div>
      ))}
    </div>
  )
}
Home.displayName = HomeName
export default Home
