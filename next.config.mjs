import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkFrontmatter from 'remark-frontmatter'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import nextMDX from '@next/mdx'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import rehypeToc from '@jsdevtools/rehype-toc'
import remarkGfm from 'remark-gfm'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    recmaPlugins: [recmaNextjsStaticProps],
    rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeToc, rehypeStringify],
  },
})
export default withMDX({
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
})
