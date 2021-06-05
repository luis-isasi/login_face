import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/css/tailwind-build.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style global jsx>{`
          body {
            background-color: rgba(24, 27, 50, 1) !important;
          }
        `}</style>
      </Html>
    );
  }
}
