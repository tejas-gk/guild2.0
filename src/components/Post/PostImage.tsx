import * as React from 'react';
import { usePostCardContext } from '@/context/PostCardContext';
import Image from 'next/image';

function PostImage() {
    const { post } = usePostCardContext();
    return (
        <div
            className='
            relative
            w-full
            min-h-[15rem]

        '
        >
            <Image
                src={post.image}
                alt={'post image'}
                width={200}
                height={200}
                className='
                    object-contain
                '
            />
        </div>
    );
}

export default PostImage;
