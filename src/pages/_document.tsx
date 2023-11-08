import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
      </Head>
      <body className='bg-gray-50 dark:bg-gray-900 overflow-y-scroll'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
