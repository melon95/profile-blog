import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'

const list = [
  {
    label: 'React',
    key: 'react',
    router: '/react',
  },
  {
    label: 'Webpack',
    key: 'webpack',
    router: '/webpack',
  },
  {
    label: 'Mobx',
    key: 'mobx',
    router: '/mobx',
  },
  {
    label: 'Node',
    key: 'node',
    router: '/node',
  },
  {
    label: 'JS',
    key: 'js',
    router: '/js',
  },
  {
    label: <Icon width={20} height={20} icon="eva:github-outline" />,
    key: 'github',
    target: '_blank',
    router: 'https://github.com/melon95',
  },
]

const combineClass = (
  con: boolean,
  className: string,
  ...baseClassNames: string[]
) => {
  const baseClassName = baseClassNames?.join(' ')
  if (con) {
    if (baseClassName !== '') {
      return `${baseClassName} ${className}`
    }
    return className
  }
  return baseClassName
}

const Nav = () => {
  const { pathname } = useRouter()

  return (
    <div className="flex">
      {list.map((item) => (
        <a
          key={item.key}
          className={combineClass(
            pathname.startsWith(item.router),
            'nav-item-active',
            'nav-item',
            'no-underline',
          )}
          target={item.target}
          href={item.router}>
          {item.label}
        </a>
      ))}
    </div>
  )
}

export default Nav
