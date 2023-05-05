import React from 'react';
import { useRouter } from 'next/router';
import useUsers from '@/hooks/useUsers';
import Head from 'next/head';
import UserBio from '@/components/User/UserBio';
import Avatar from '@/components/Post/Avatar';
import Image from 'next/image';
import PostFeed from '@/components/Post/PostFeed';
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
                <title>{user?.username}</title>
            </Head>
            <div className='relative'>
                <div className='bg-red-600'>
                    {/* <Image
                        alt='Banner'
                        src={user?.coverImage}
                        onClick={() => {}}
                        width={1000}
                        height={300}
                        className='
          object-cover
          w-full
          h-48
          '
                    /> */}
                </div>
                <div
                    className='
          absolute
          top-40
          left-5
        '
                >
                    <Avatar seed={user?.id} />
                </div>
                <UserBio />
            </div>

            <PostFeed data={post} />
        </>
    );
}
