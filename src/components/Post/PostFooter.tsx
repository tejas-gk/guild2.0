import * as React from 'react';
import { ReactNode } from 'react';
import { usePostCardContext } from '@/context/PostCardContext';

export type Post = {
    id: number;
    image: string;
    title: string;
    category: string;
    rating: { stars: number; reviews: number };
    price: number;
};

type Props = {
    children: ReactNode;
    onClick: (post: Post) => void;
};

function ProductFooter({ children, onClick }: Props) {
    const { post } = usePostCardContext();

    const handleClick = () => {
        // onClick(post);
    };

    return (
        <button type='button' onClick={handleClick} className='post-button'>
            {children}
        </button>
    );
}

export default ProductFooter;
