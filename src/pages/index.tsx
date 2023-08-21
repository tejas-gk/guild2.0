import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { signOut } from 'next-auth/react';
import Post from '@/components/Post';
import PostFeed from '@/components/shared/PostFeed';
import Button from '@/components/Button';
import usePosts from '@/hooks/usePosts';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const { data: posts } = usePosts();

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
        };

        fetchSession();
    }, []);

    return (
        <>
            <Head>
                <title>Guild</title>
                <meta name='description' content='This is Guild 2.0' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Post />
            <PostFeed data={posts} />
        </>
    );
}
