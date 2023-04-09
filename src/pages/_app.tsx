import BottomMobNavb from '@/components/BottomMobNavb'
import Modal from '@/components/Modal'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Modal
        isOpen={true}
        onClose={() => { }}
        onSend={() => { }}
        title='Title'
        body='Body'
        footer='Footer'
        actionLabel='Action'
        disabled={false}
      />
      <Navbar />
      <Component {...pageProps} />
      <div className='
        sm:hidden
        block
      '>
        <BottomMobNavb/>
      </div>
    </>
  )
}
