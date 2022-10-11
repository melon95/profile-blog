import '../styles/globals.css'
import '../themes/Drake/drake-jb.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from '../components/Head'

export const HomeName = 'Home'

interface IProps {
  title: string
  keyword: string
}

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props
  const isHome = Component.displayName === HomeName
  const {
    title = 'Home',
    keyword = 'React Next Mdx blog melon95 webpack node mobx',
  } = pageProps as IProps
  return (
    <Layout isHome={isHome}>
      <Head title={title} keyword={keyword} />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
