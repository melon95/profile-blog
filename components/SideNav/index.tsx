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
    {
      label: 'Hooks原理',
      router: 'hooks',
    },
    {
      label: '合成事件',
      router: 'event',
    },
    {
      label: '懒加载',
      router: 'lazy-loading',
    },
  ],
  '/typescript': [
    {
      label: '介绍',
      router: '',
    },
    {
      label: '类型世界',
      router: 'type-world',
    },
    {
      label: '函数和 Class 类型',
      router: 'function',
    },
    {
      label: '泛型和类型工具',
      router: 'generics',
    },
    {
      label: '类型编程工具',
      router: 'type-programme',
    },
    {
      label: '结构化类型系统',
      router: 'structural-typing',
    },
    {
      label: '类型声明',
      router: 'type-declare',
    },
    {
      label: '配置文件',
      router: 'config',
    },
    {
      label: 'React 中的 TypeScript 类型',
      router: 'react',
    },
    {
      label: '工具和资料',
      router: 'tools',
    },
  ],
  '/mobx': [
    {
      label: '介绍',
      router: '',
    },
    {
      label: '源码学习',
      router: '/source-code',
    },
    {
      label: '概念解释',
      router: '/explanation',
    },
    {
      label: 'Observable',
      router: '/observable',
    },
    {
      label: 'Observable-Object',
      router: '/observable-object',
    },
    {
      label: 'Observable-Array',
      router: '/observable-array',
    },
    {
      label: 'Observable-Proxy',
      router: '/observable-proxy',
    },
    {
      label: 'Reaction',
      router: '/reaction',
    },
    {
      label: 'Computed',
      router: '/computed',
    },
    {
      label: 'Action',
      router: '/action',
    },
    {
      label: '批量更新',
      router: '/batch-update',
    },
    {
      label: '装饰器',
      router: '/descrtor',
    },
    {
      label: '集成 React',
      router: '/mobx-react-lite',
    },
  ],
  '/webpack': [
    {
      label: '介绍',
      router: '',
    },
    {
      label: '模块加载',
      router: '/module-loading',
    },
    {
      label: 'HMR',
      router: '/hmr',
    },
    {
      label: 'Loader',
      router: '/loader',
    },
    {
      label: 'Plugin',
      router: '/plugin',
    },
    {
      label: '缓存',
      router: '/cache',
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
