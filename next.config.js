/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      // import('recma-nextjs-static-props'),
      // import('remark-mdx-frontmatter'),
    ],
    // recmaPlugins: [import('recma-nextjs-static-props')],
  },
})
module.exports = withMDX({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
})
