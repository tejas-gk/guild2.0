import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useGuild from '@/hooks/useGuild';
import usePosts from '@/hooks/usePosts';
import Head from 'next/head';
import Image from 'next/image';
import Avatar from '@/components/Avatar';
import GuildInfo from '@/components/Guild/GuildInfo';
import PostItem from '@/components/Post/PostItem';
export default function GuildPage() {
    const router = useRouter();
    const { guildId } = router.query;

    const { data: guild } = useGuild(guildId as string);

    const { data: posts = [] } = usePosts();

    const post = posts.filter(
        (post: Record<string, any>) => post.guildId === guildId
    );
    return (
        <>
            <Head>
                <title>{guild?.guildId}</title>
            </Head>
            <div className='relative'>
                <div className='w-full h-40'>
                    <Image
                        alt='Banner'
                        src={
                            guild?.coverImage ||
                            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
                        }
                        onClick={() => {}}
                        width={1000}
                        height={300}
                        className='
          object-cover
          w-full
          h-48
          '
                    />
                </div>
                <div
                    className='
          absolute
          top-40 left-5
        '
                >
                    <Avatar size='large' seed={guild?.id} />
                </div>
                <GuildInfo />
            </div>
            {post.map((post: Record<string, any>) => (
                <div key={post.id}>
                    <PostItem data={post} />
                </div>
            ))}
        </>
    );
}
