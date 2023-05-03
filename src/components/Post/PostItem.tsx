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
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();
    const { mutate: deletePost } = DeletePost();

    return (
        <div className='bg-white rounded-md shadow-md p-4 mb-4 hover:shadow-lg'>
            <div className='flex items-center mb-4'>
                <Avatar seed={data?.user.id} className='mr-2' />
            </div>
            <div className='mb-4 flex'>
                <p className='text-lg font-semibold'>@{data?.user?.username}</p>
                <p className='text-lg ml-4'>{data?.body}</p>
            </div>
            <div className='flex justify-between items-center'>
                <p className='text-gray-500 text-sm'>
                    Posted on {data?.createdAt}
                </p>
                {currentUser?.id === data?.user?.id && (
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            await deletePost();
                            router.push('/');
                        }}
                        method='DELETE'
                    >
                        <button
                            type='submit'
                            className='text-white-500 hover:text-blue-600 font-semibold px-2 py-1 rounded-md'
                            style={{
                                backgroundColor: '#FF4136',
                                boxShadow: '0px 3px 0px 0px #E51C23',
                            }}
                        >
                            Delete
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
