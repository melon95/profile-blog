import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'

export const HomeName = 'Home'

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props
  const isHome = Component.displayName === HomeName
  return (
    <Layout isHome={isHome}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
