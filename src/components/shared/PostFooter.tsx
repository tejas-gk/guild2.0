import * as React from 'react';
import { ReactNode } from 'react';
import { usePostCardContext } from '@/context/PostCardContext';
import { Post } from '@/types/post';
type Props = {
    children: ReactNode;
    onClick: (post: Post) => void;
};

function PostFooter({ children, onClick }: Props) {
    const { post } = usePostCardContext();

    const handleClick = () => {
        // onClick(post);
    };

    return (
        <div
            className='
            flex
            flex-row
            gap-3
            items-center
            w-full
            bg-gray-50
        '
        >
            {children}
        </div>
    );
}

export default PostFooter;
