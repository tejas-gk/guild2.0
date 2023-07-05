import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import Avatar from '../Avatar';
import { RiMessage3Line, RiHeart3Line } from 'react-icons/ri';
import { BiUpvote, BiDownvote, BiTrashAlt } from 'react-icons/bi';
import { CiTrash } from 'react-icons/ci';
// import { PiShareFat } from 'react-icons/pi';
import { MdOutlineContentCopy } from 'react-icons/md';
import Link from 'next/link';
import { pusherClient } from '@/lib/pusher';
import axios from 'axios';
import Image from 'next/image';
import usePosts from '@/hooks/usePosts';
import { useToast } from '@/hooks/useToast';
import { formatDistance, subDays } from 'date-fns';

interface PostItemProps {
    userId?: string;
    data?: Record<string, any>;
}

export default function PostItem({ data = {} }: PostItemProps): any {
    const currentUser = useCurrentUser();
    const router = useRouter();
    const { mutate: mutatePosts, isLoading: postsLoading } = usePosts();
    const { mutate: mutatePost, isLoading: postLoading } = usePosts(
        router.query.id as string
    );
    const toast = useToast();

    const [likeCount, setLikeCount] = useState<number>(
        data?.likedIds?.length || 0
    );

    const postBodyRef = useRef<HTMLDivElement>(null);
    const shouldAddOverflowClip = router.pathname !== '/posts/[...postId]';
    console.log(shouldAddOverflowClip, router.pathname);

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

    const handleShare = useCallback(
        (link: any) => {
            navigator.clipboard
                .writeText(link)
                .then(() => {
                    toast.info('Link copied ! Now you can share it');
                })
                .catch((error) => {
                    toast.error('Uh Oh Something doesnt seem right');
                });
        },
        [toast]
    );

    if (postsLoading || postLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div
            className='  
        border-b-[1px] 
        border-neutral-800/20
        p-5 
        cursor-pointer 
        transition
         bg-white
         mx-0
          '
        >
            <div
                className='flex
            gap-4
            items-center
            h-10
            sm:text-sm text-xs
            text-gray-500'
            >
                <Avatar seed={data?.user?.id} size='small' />
                <Link href='/'>
                    <span
                        className='
                                underline underline-offset-2
                                hover:underline-offset-4
                                transition 
                                text-zinc-900
                                sm:text-sm text-xs
                                '
                    >
                        {data?.user?.name}
                    </span>
                </Link>
                <span className='font-bold'>.</span>
                <p>
                    Posted by <span className=''>@{data?.user?.username}</span>
                </p>
                <p>
                    {formatDistance(
                        subDays(new Date(data.createdAt), 3),
                        new Date(),
                        {
                            addSuffix: true,
                        }
                    )}
                </p>
            </div>

            <div
                className={`
                    relative
                    ${shouldAddOverflowClip ? ' max-h-40 overflow-clip' : ''}
                    `}
                ref={postBodyRef}
            >
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
                                        sm:aspect-13/9 w-full
                                    '
                        />
                    )}
                    {postBodyRef.current?.clientHeight === 160 &&
                        shouldAddOverflowClip && (
                            <div
                                className='absolute 
                        bottom-0 left-0
                        h-24 w-full
                        bg-gradient-to-t from-white to-transparent
                        '
                            ></div>
                        )}
                </Link>
            </div>

            <div
                className='
                flex
                flex-row
                justify-between
                items-center
                mt-2
                '
            >
                <div
                    className='
                icon-container
                hover:text-sky-500
            '
                >
                    <RiMessage3Line className='icon' />
                    <p>{data?.comments?.length}</p>
                </div>
                <div
                    className='
                icon-container
                hover:text-red-500
            '
                    onClick={handleLike}
                >
                    <RiHeart3Line className='icon' />
                    <p>{likeCount}</p>
                </div>
                {currentUser?.data?.id === data?.user?.id && (
                    <div
                        className='
                icon-container
                hover:text-red-800
            '
                        onClick={() => deletePost(data?.id)}
                    >
                        <CiTrash className='icon' />
                    </div>
                )}

                <div
                    className='
                
                icon-container
                hover:text-green-500'
                >
                    <BiUpvote className='icon' />
                </div>
                <div
                    className='
                
                icon-container
                hover:text-green-500'
                >
                    <BiDownvote className='icon' />
                </div>

                <div
                    className='
                icon-container
                hover:text-yellow-500
            '
                    onClick={() =>
                        handleShare(`http://localhost:3000/posts/${data?.id}`)
                    }
                >
                    <MdOutlineContentCopy className='icon' />
                </div>
            </div>
        </div>
    );
}
