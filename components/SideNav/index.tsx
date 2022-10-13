import { useRouter } from 'next/router'
import style from './index.module.scss'

interface IRouter {
  label: string
  router: string
}

const sideNavList: {
  [key: string]: IRouter[]
} = {
  '/react': [
    {
      label: '介绍',
      router: '/',
    },
    {
      label: 'Render 阶段',
      router: 'render-phase',
    },
    {
      label: 'Commit 阶段',
      router: 'commit-phase',
    },
  ],
  '/webpack': [
    {
      label: 'webpack1',
      router: 'test',
    },
    {
      label: 'webpac2',
      router: 'test1',
    },
    {
      label: 'webpac3',
      router: 'test2',
    },
  ],
}

const SideNav = () => {
  const { pathname, push } = useRouter()
  const key = Object.keys(sideNavList).find((nav) => pathname.startsWith(nav))
  const curNav = key ? sideNavList[key] : []
  const linkTo = (route: string) => {
    push(`${key as string}/${route}`)
  }
  return (
    <aside className={`${style.aside} flex justify-end border-solid border-r`}>
      <nav className={style.nav}>
        {curNav.map((cur) => (
          <div
            className="cursor-pointer text-lg my-2 text-opacity-60 text-black hover:text-opacity-100"
            onClick={() => linkTo(cur.router)}
            key={cur.label}>
            {cur.label}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default SideNav
