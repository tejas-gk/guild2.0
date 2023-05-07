import BottomMobNavb from '@/components/BottomMobNavb';
import Modal from '@/components/Modal';
import LoginModal from '@/components/Modals/LoginModal';
import Navbar from '@/components/Navbar';
import RegisterModal from '@/components/Modals/RegisterModal';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
import Layout from '@/layout/Layout';
import EditModal from '@/components/Modals/EditModal';

export default function App({ Component, pageProps, router }: AppProps) {
    const { data: currentUser } = useCurrentUser();
    return (
        <>
            <SessionProvider session={pageProps.session}>
                {!currentUser ? (
                    <>
                        <RegisterModal />
                        <LoginModal />
                    </>
                ) : (
                    <>
                        <EditModal />
                    </>
                )}

                <Navbar />
                <Layout pathname={router.pathname}>
                    <Component {...pageProps} />
                </Layout>
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
