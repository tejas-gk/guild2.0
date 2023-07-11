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
    const postsPerPage = 5;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const nextPage = currentPage + 1;
                    const startIndex = (nextPage - 1) * postsPerPage;
                    const endIndex = startIndex + postsPerPage;

                    setCurrentPage(nextPage);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            }
        );

        const { current: lastPostElement } = lastPostRef;
        if (lastPostElement) {
            observer.observe(lastPostElement);
        }

        console.log('currentPage', currentPage);

        return () => {
            if (lastPostElement) {
                observer.unobserve(lastPostElement);
            }
        };
    }, [currentPage]);

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
