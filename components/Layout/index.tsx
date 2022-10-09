import Header from '../Header'
import Footer from '../Footer'
import SideNav from '../SideNav'
import React from 'react'
import style from './index.module.scss'

interface IProps {
  children: React.ReactNode
  isHome: boolean
}
const Layout = (props: IProps) => {
  const { children, isHome } = props
  return (
    <>
      <Header />
      <main id="layout-container" className={isHome ? 'p-4' : 'flex'}>
        {isHome ? (
          children
        ) : (
          <>
            <SideNav />
            <div className="flex-auto">
              <div className={`${style['blog-container']} m-auto`}>
                {children}
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default Layout
