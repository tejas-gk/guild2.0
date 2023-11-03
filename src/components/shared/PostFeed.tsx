import usePosts from '@/hooks/usePosts';
import PostItem from '../Post/PostItem';
import Link from 'next/link';
import PostCard from './PostCard';
import Image from 'next/image';
import { useToast } from '@/hooks/useToast';
import { useRef, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
interface PostFeedProps {
    data?: Record<string, any>;
    userId?: string;
}

export default function PostFeed({
    data = [],
}: PostFeedProps): React.ReactElement<React.ReactNode> {
    let posts = data.posts;
    console.log(posts, 'ppp');
    const lastPostRef = useRef<HTMLDivElement>(null);

    const [hasMorePosts, setHasMorePosts] = useState(true);

    const handleNoMorePosts = () => setHasMorePosts(false);

    const loadMorePosts = async () => {
        alert('load more posts');
    };

    return (
        <div className='flex flex-col'>
            {/* <InfiniteScroll
                dataLength={posts.length}
                hasMore={hasMorePosts}
                next={loadMorePosts}
                loader={<div>loading...</div>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            > */}
            {posts?.map((post: Record<string, any>, index: number) => (
                <div
                    key={post.id}
                    className='
                gap-4
                mx-4 mt-4'
                >
                    <PostItem data={post} />
                </div>
            ))}
            {/* </InfiniteScroll> */}
        </div>
    );
}
