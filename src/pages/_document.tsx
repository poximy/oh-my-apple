import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=IBM+Plex+Sans&display=swap'
          rel='stylesheet'
        />
        <meta
          name='description'
          content='Apple Rumors scrapes other apple rumor websites into a nice format'
        />
        <meta property='og:url' content='https://apple-rumors.vercel.app' />
      </Head>
      <body className='m-8 bg-primary font-ibm-sans'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
