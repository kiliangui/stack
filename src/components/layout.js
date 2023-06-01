import './globals.css'
import { Inter } from 'next/font/google'
import '@picocss/pico'


export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}