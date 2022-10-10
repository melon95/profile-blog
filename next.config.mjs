import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkFrontmatter from 'remark-frontmatter'

import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import nextMDX from '@next/mdx'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    recmaPlugins: [recmaNextjsStaticProps],
  },
})
export default withMDX({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  compiler: {
    // removeConsole: {
    //   exclude: ['error'],
    // },
  },
})
