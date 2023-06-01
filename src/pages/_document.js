import { Header } from '@/components/header'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <body>
        <Header/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}