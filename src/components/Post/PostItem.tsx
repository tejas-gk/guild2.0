import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import Avatar from './Avatar';
import {
    HeartIcon,
    MailIcon,
    TrashIcon,
    ShareIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { pusherClient } from '@/lib/pusher';
import axios from 'axios';
import Image from 'next/image';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';
import { useToast } from '@/hooks/useToast';

interface PostItemProps {
    userId?: string;
    data?: Record<string, any>;
}

export default function PostItem({ data = {} }: PostItemProps): any {
    const currentUser = useCurrentUser();
    const router = useRouter();
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(router.query.id as string);
    const toast = useToast();

    const [likeCount, setLikeCount] = useState<number>(
        data?.likedIds?.length || 0
    );

    useEffect(() => {
        const channel = pusherClient.subscribe(`post-${data.id}`);

        channel.bind('post-updated', (updatedPost: any) => {
            setLikeCount(updatedPost.likedIds?.length || 0);
        });

        return () => {
            pusherClient.unsubscribe(`post-${data.id}`);
        };
    }, [data.id]);

    const hasLiked = false;

    const handleLike = async () => {
        try {
            if (hasLiked) {
                toast.warning('I havent written this yet');
                return;
            }
            await axios.post('/api/like', {
                postId: data.id,
            });
            toast.success('Liked');
        } catch (error) {
            console.log(error);
            toast.error('fuck');
        }
    };

    const deletePost = async (postId: string) => {
        try {
            const url = `/api/posts`;
            await axios.delete(url, {
                data: { postId },
            });
            mutatePost();
            mutatePosts();
            toast.success('Deleted');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div
            className='
            bg-white
            mx-0
        '
        >
            <div>
                <div
                    className='  
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        transition
          '
                >
                    <div
                        className='
                flex
                flex-row
                items-start
                p-2
                rounded-md
                mb-2
                '
                    >
                        <Avatar seed={data?.user?.id} />

                        <p
                            className='
                    text-gray-700
                    font-semibold
                    text-sm
                    ml-2
                    mt-0.5
                    '
                        >
                            {data?.user?.name}
                        </p>
                        <p
                            className='
                    text-gray-700
                    ml-2
                    '
                        >
                            @{data?.user?.username}
                        </p>
                        <div className='ml-auto'>
                            <span className='text-neutral-500 text-sm'>
                                {new Date(data?.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <div>
                        <Link href={`/posts/${data?.id}`}>
                            <p
                                className='
                            text-gray-700
                            '
                            >
                                {data?.body}
                            </p>
                            {data?.image && (
                                <Image
                                    src={data?.image}
                                    alt='image'
                                    width={500}
                                    height={500}
                                    className='
                                        object-cover
                                    '
                                />
                            )}
                        </Link>
                    </div>

                    <div
                        className='flex 
                    flex-row
                     items-center
                      mt-3
                      gap-10 
                      justify-between'
                    >
                        <div
                            className='
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            '
                        >
                            <MailIcon className='icon' />
                            <p>{data?.comments?.length}</p>
                        </div>
                        <div
                            className='
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            '
                            onClick={handleLike}
                        >
                            <HeartIcon className='icon' />
                            <p>{likeCount}</p>
                        </div>
                        {currentUser?.data?.id === data?.user?.id && (
                            <div
                                className='
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            '
                                onClick={() => deletePost(data?.id)}
                            >
                                <TrashIcon className='icon' />
                            </div>
                        )}

                        <div
                            className='
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
            '
                            onClick={() => deletePost(data?.id)}
                        >
                            <ShareIcon className='icon' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
