import { useRouter } from 'next/router'
import { useMemo } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'

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
      router: '',
    },
    {
      label: 'Render 阶段',
      router: 'render-phase',
    },
    {
      label: 'Commit 阶段',
      router: 'commit-phase',
    },
    {
      label: 'Scheduler',
      router: 'scheduler',
    },
    {
      label: '优先级',
      router: 'proirity',
    },
  ],
}

const SideNav = () => {
  const { pathname, push } = useRouter()
  const key = Object.keys(sideNavList).find((nav) => pathname.startsWith(nav))
  const curNav = key ? sideNavList[key] : []

  const curPage = useMemo(() => {
    if (key) {
      const list = pathname.split('/')
      return list[2] || ''
    }
    return ''
  }, [key, pathname])

  const linkTo = (route: string) => {
    push(`${key as string}/${route}`)
  }
  return (
    <aside
      className={`${style.aside} flex justify-end border-r border-border dark:border-dark-border pt-6 pb-16`}>
      <nav className={style.nav}>
        {curNav.map((cur) => (
          <div
            className={classNames(
              'cursor-pointer text-base my-2 text-opacity-60 text-black hover:text-opacity-100 text-text dark:text-dark-text hover:text-primary dark:hover:text-primary',
              {
                'nav-item-active': cur.router === curPage,
              },
            )}
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
