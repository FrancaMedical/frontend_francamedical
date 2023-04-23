import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
   
    <Component {...pageProps} />
    </>
  )
}
