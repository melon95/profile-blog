import Head from 'next/head'

interface IProps {
  title: string
  keyword: string
}

const NextHead = (props: IProps) => {
  const { title, keyword } = props
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={keyword} />
    </Head>
  )
}

export default NextHead
