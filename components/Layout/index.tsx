import Header from '../Header'
import Footer from '../Footer'
import React from 'react'

interface IProps {
  children: React.ReactNode
}
const Layout: (props: IProps) => React.ReactElement = ({ children }) => {
  return (
    <>
      <Header />
      <main id="layout-container">{children}</main>
      <Footer />
    </>
  )
}

export default Layout