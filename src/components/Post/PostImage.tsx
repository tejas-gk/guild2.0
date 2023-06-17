import * as React from 'react';
import { usePostCardContext } from '@/context/PostCardContext';

function PostImage() {
    const { post } = usePostCardContext();
    return (
        <div className='product-image'>
            <img src={post.image} alt='' />
        </div>
    );
}

export default PostImage;
