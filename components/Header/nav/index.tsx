import { useRouter } from 'next/router';
import React from 'react';


const list = [
  {
    label: 'React',
    router: '/react'
  },
  {
    label: 'Webpack',
    router: '/webpack'
  },
  {
    label: 'Mobx',
    router: '/mobx'
  },
  {
    label: 'Node',
    router: '/node'
  },
  {
    label: 'JS',
    router: '/js'
  }
]

const combineClass = (con: boolean, className: string, ...baseClassNames: string[]) => {
  const baseClassName = baseClassNames?.join(' ')
  if (con) {
    if (baseClassName) {
      return `${baseClassName} ${className}`
    }
    return className
  }
  return baseClassName
}

const Nav = () => {
  const { pathname, push } = useRouter()

  const linkTo = (router: string) => {
    push(router)
  }

  return <div className="flex">
    {
      list.map(item => <div onClick={() => linkTo(item.router)} className={combineClass(pathname.startsWith(item.router), 'nav-item-active', 'nav-item', 'cursor-pointer')} key={item.label}>{ item.label }</div>)
    }
  </div>
}

export default Nav