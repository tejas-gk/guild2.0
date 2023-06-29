import * as React from 'react';
import { usePostCardContext } from '@/context/PostCardContext';
import Image from 'next/image';

function PostImage() {
    const { post } = usePostCardContext();
    return (
        <div
            className='
            relative
            max-w-full

        '
        >
            <Image
                src={post.image}
                alt={'post image'}
                width={200}
                height={200}
                className='
                    object-contain
                    w-full max-h-[20rem]
                '
            />
        </div>
    );
}

export default PostImage;
