import Document, { Head, Main, NextScript } from 'next/document';
const withConfig = (App, query, pathname) => props => {
  props.pageProps.query = query;
  props.pageProps.pathname = pathname;
  return <App {...props} />;
};

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => withConfig(App, ctx.query, ctx.pathname),
      });
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // console.log(this.props)
    return (
      <html amp="">
        <Head></Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
