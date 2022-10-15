import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html className="h-full">
        <Head />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        />
        <link
          rel="stylesheet"
          href="https://qidian.gtimg.com/lulu/edge/css/common/ui/Checkbox.css"
        />
        <link
          rel="stylesheet"
          href="https://qidian.gtimg.com/lulu/edge/css/common/ui/Switch.css"
        />
        <body className="h-full bg-bg dark:bg-dark-bg">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
