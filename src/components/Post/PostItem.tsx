import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import React from 'react';
import Avatar from './Avatar';
import DeletePost from '@/hooks/deletePost';

interface PostItemProps {
    userId?: string;
    data?: Record<string, any>;
}

export default function PostItem({ userId, data = {} }: PostItemProps): any {
    console.log(data);
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();
    const { mutate: deletePost } = DeletePost();
    return (
        <div
            className='
            bg-white
            rounded-md
            shadow-md
            px-4 py-2
            w-full
            flex
            flex-col
        '
        >
            <Avatar seed={data?.user.id} />
            <p>user: {data?.user?.username}</p>
            <div>{data?.body}</div>
            <p>{data?.user?.id}</p>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await deletePost();
                    router.push('/');
                }}
                method='DELETE'
                className='flex items-center justify-between'
            >
                <button
                    type='submit'
                    className='
                    bg-blue-500
                    '
                >
                    Delete
                </button>
            </form>
        </div>
    );
}
