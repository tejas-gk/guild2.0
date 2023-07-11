import React from 'react';
import { useRouter } from 'next/router';
import useUsers from '@/hooks/useUsers';
import Head from 'next/head';
import UserBio from '@/components/User/UserBio';
import Avatar from '@/components/Avatar';
import Image from 'next/image';
import PostFeed from '@/components/shared/PostFeed';
import usePosts from '@/hooks/usePosts';

export default function UserId() {
    const router = useRouter();
    const { userId } = router.query;

    const { data: user } = useUsers(userId as string);
    const { data: posts = [] } = usePosts();

    const post = posts.filter(
        (post: Record<string, any>) => post.userId === userId
    );

    console.log('from [userId]', post, posts, userId);

    return (
        <>
            <Head>
                <title>{user?.userId}</title>
            </Head>
            <div className='relative'>
                <div className=' w-full h-40'>
                    <Image
                        alt='Banner'
                        src={
                            user?.coverImage ||
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
                    <Avatar size='large' seed={user?.id} />
                </div>
                <UserBio />
            </div>

            <PostFeed data={post} />
        </>
    );
}
