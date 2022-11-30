import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { useMemo, ChangeEventHandler } from 'react'

const Nav = () => {
  const { pathname } = useRouter()
  const switchTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.target.checked
    const htmlClassList = document.documentElement.classList
    if (checked) {
      htmlClassList.add('dark')
    } else {
      htmlClassList.remove('dark')
    }
  }
  const list = useMemo(
    () => [
      {
        label: 'JavaScript',
        key: 'javascript',
        router: '/javascript',
      },
      {
        label: 'TypeScript',
        key: 'typescript',
        router: '/typescript',
      },
      {
        label: 'React',
        key: 'react',
        router: '/react',
      },
      {
        label: 'Node',
        key: 'node',
        router: '/node',
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
        label: (
          <input
            onChange={switchTheme}
            type="checkbox"
            id="switch"
            is="ui-switch"
            key="themes"
          />
        ),
        key: 'themes',
      },
      {
        label: <Icon width={20} height={20} icon="eva:github-outline" />,
        key: 'github',
        target: '_blank',
        router: 'https://github.com/melon95',
      },
    ],
    [],
  )
  return (
    <div className="flex items-center">
      {list.map((item) =>
        item.router ? (
          <a
            key={item.key}
            className={classNames(
              {
                'nav-item-active': pathname.startsWith(item.router),
              },
              'nav-item',
              'no-underline',
              'text-text',
              'dark:text-dark-text',
              'hover:text-primary',
              'dark:hover:text-primary',
            )}
            target={item.target}
            href={item.router}>
            {item.label}
          </a>
        ) : (
          item.label
        ),
      )}
    </div>
  )
}

export default Nav
