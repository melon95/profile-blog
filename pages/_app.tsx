import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from '../components/Head'

export const HomeName = 'Home'

const MDXComponentName = 'MDXContent'

interface IMatterObj {
  [key: string]: string
}

const MyApp = (props: AppProps) => {
  const { pageProps } = props
  const Component = props.Component as unknown as React.FC
  const isHome = Component.displayName === HomeName
  const isMD = Component.name === MDXComponentName
  let MDComponent = Component
  if (isMD) {
    const obj: any = Component({})
    const {
      props: { children },
    } = obj
    // 获取matter字符串
    const matterList: string[] = children[2].props.children.split('\n')
    const matterObj: IMatterObj = {}
    matterList.forEach((satge) => {
      const [key, value] = satge.split(':')
      matterObj[key] = value
    })
    const { title, keyword } = matterObj
    // eslint-disable-next-line react/display-name
    MDComponent = () => {
      return (
        <>
          <Head title={title} keyword={keyword} />
          {children.slice(4)}
        </>
      )
    }
  }
  return (
    <Layout isHome={isHome}>
      <MDComponent {...pageProps} />
    </Layout>
  )
}

export default MyApp
