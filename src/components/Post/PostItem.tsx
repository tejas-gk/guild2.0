import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import Avatar from './Avatar';
import { HeartIcon, MailIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { pusherClient, pusherServer } from '@/lib/pusher';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface PostItemProps {
    userId?: string;
    data?: Record<string, any>;
}

export default function PostItem({ data = {} }: PostItemProps): any {
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();

    const [likesCount, setLikesCount] = useState(data?.likes?.length || 0);

    const handleLike = async () => {
        try {
            await axios.post('/api/like', {
                postId: data.id,
            });
            toast.success('Liked');
        } catch (error) {
            console.log(error);
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
                            {data?.image && (
                                <img src={data?.image} alt='image' />
                            )}
                            <p
                                className='
                    text-gray-700
                    '
                            >
                                {data?.body}
                            </p>
                        </Link>
                    </div>

                    <div className='flex flex-row items-center mt-3 gap-10'>
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
                            <p>{data?.likedIds?.length || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
