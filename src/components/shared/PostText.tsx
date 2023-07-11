import * as React from 'react';
import { usePostCardContext } from '@/context/PostCardContext';

function PostImage() {
    const { post } = usePostCardContext();
    return (
        <div
            className='
            
        '
        >
            <p>{post.post}</p>
        </div>
    );
}

export default PostImage;
