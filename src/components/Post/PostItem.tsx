import React from 'react';

interface PostItemProps {
    postId?: string;
    body?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

export default function PostItem({
    postId,
    body,
    header,
    footer,
}: PostItemProps): any {
    return (
        <div
            className='
            flex
            flex-col
            bg-white
            text-black
            rounded-lg
            shadow-lg
            overflow-hidden
            px-4 py-4
            w-full
            
        '
        >
            <div className='flex'>{header}</div>
            <div className='flex flex-col'>{body}</div>
            <div className='flex'>{footer}</div>
        </div>
    );
}
