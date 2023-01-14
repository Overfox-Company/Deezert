import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppRouter from './App'
export default function App({ Component, pageProps }: AppProps) {
  return <AppRouter><Component {...pageProps} /></AppRouter>
}
