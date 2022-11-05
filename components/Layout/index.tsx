import Header from '../Header'
import Footer from '../Footer'
import SideNav from '../SideNav'
import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'

interface IProps {
  children: React.ReactNode
  isHome: boolean
}
const Layout = (props: IProps) => {
  const { children, isHome } = props
  return (
    <>
      <Header />
      <main
        id="layout-container"
        className={classNames({
          'p-4': isHome,
          flex: !isHome,
        })}>
        {isHome ? (
          children
        ) : (
          <>
            <SideNav />
            <div className="flex-auto">
              <div
                id="write"
                className={`${style['blog-container']} m-auto py-16 prose dark:prose-invert break-words`}>
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
