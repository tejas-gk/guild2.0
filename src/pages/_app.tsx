import BottomMobNavb from '@/components/BottomMobNavb';
import Modal from '@/components/Modal';
import LoginModal from '@/components/Modals/LoginModal';
import Navbar from '@/components/Navbar';
import RegisterModal from '@/components/Modals/RegisterModal';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <SessionProvider session={pageProps.session}>
                <RegisterModal />
                <LoginModal />
                <Navbar />
                <Component {...pageProps} />
                <div
                    className='
                    sm:hidden
                     block
                 '
                >
                    <BottomMobNavb />
                </div>
                <Toaster />
            </SessionProvider>
        </>
    );
}
