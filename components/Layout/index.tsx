import Header from '../Header'
import Footer from '../Footer'
import SideNav from '../SideNav'
import React, { useEffect, useState } from 'react'

interface IProps {
  children: React.ReactNode
  isHome: boolean
}
const Layout: (props: IProps) => React.ReactElement = ({ children, isHome }) => {
  const [title, setTitle] = useState('')
  useEffect(() => {
    setTitle(document.querySelector('h1')?.textContent ?? '')
  }, [])
  return (
    <>
      <Header />
      <main id="layout-container" className={isHome ? 'p-4' : 'flex'}>
        {
          isHome ? children : <>
            <SideNav />
            <div className='flex-auto'>
              <div style={{
                maxWidth: '780px'
              }} className='m-auto'>
                {children}
              </div>
            </div>
          </>
        }
      </main>
      <Footer />
    </>
  )
}

export default Layout