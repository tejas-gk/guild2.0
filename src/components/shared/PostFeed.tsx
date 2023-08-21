import usePosts from '@/hooks/usePosts';
import PostItem from '../Post/PostItem';
import Link from 'next/link';
import PostCard from './PostCard';
import Image from 'next/image';
import { useToast } from '@/hooks/useToast';
import { useRef, useState, useEffect } from 'react';

interface PostFeedProps {
    data?: Record<string, any>;
    userId?: string;
}

export default function PostFeed({
    data,
}: PostFeedProps): React.ReactElement<React.ReactNode> {
    const posts = data;
    const lastPostRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className='flex flex-col'>
            {posts?.map((post: Record<string, any>, index: number) => (
                <div
                    ref={index === posts.length - 1 ? lastPostRef : null}
                    key={post.id}
                    className='
                gap-4
                mx-4 mt-4'
                >
                    <PostItem data={post} />
                </div>
            ))}
        </div>
    );
}
