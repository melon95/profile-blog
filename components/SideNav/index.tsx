import { useRouter } from 'next/router'


interface IRouter {
  label: string;
  router: string
}

const sideNavList: {
  [key: string]: IRouter[]
} = {
  '/react': [
    {
      label: 'react1',
      router: 'test'
    },
    {
      label: 'react2',
      router: 'test1'
    },
    {
      label: 'react3',
      router: 'test2'
    },
  ],
  '/webpack': [
    {
      label: 'webpack1',
      router: 'test'
    },
    {
      label: 'webpac2',
      router: 'test1'
    },
    {
      label: 'webpac3',
      router: 'test2'
    },
  ]
}

const SideNav = () => {
  const { pathname, push } = useRouter()
  const key = Object.keys(sideNavList).find(nav => pathname.startsWith(nav))
  const curNav = key ? sideNavList[key] : []
  const linkTo = (route: string) => {
    return push(`${key}/${route}`)
  }
  return <aside style={{
    flex: '0 1 500px',
    borderRight: '1px solid #ccc'
  }} className="flex justify-end">
    <nav style={{
    width: '220px'
    }}>
      {
        curNav.map(cur => <div className='cursor-pointer' onClick={() => linkTo(cur.router)} key={cur.label}>{ cur.label }</div>)
      }
  </nav>
  </aside>
}

export default SideNav