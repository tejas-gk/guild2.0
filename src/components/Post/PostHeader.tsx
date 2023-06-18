import * as React from 'react';
import { ReactNode } from 'react';
import { usePostCardContext } from '@/context/PostCardContext';
import { Post } from '@/types/post';
type Props = {
    children: ReactNode;
};

function ProductFooter({ children }: Props) {
    return (
        <div
            className='flex
            flex-row
            gap-3
            items-center
                                    max-h-40
                        text-xs
                        text-gray-500
        '
        >
            {children}
        </div>
    );
}

export default ProductFooter;
