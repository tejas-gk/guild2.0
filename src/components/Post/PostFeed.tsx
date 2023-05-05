import usePosts from '@/hooks/usePosts';
import PostItem from './PostItem';
import Link from 'next/link';

interface PostFeedProps {
    data?: Record<string, any>;
    userId?: string;
}

export default function PostFeed({
    data,
    userId,
}: PostFeedProps): React.ReactElement<React.ReactNode> {
    const posts = data;

    return (
        <div className='bg-blue-300'>
            {posts?.map((post: Record<string, any>) => (
                <div key={post.id} className='gap-4 mx-4 mt-4'>
                    <PostItem data={post} />
                </div>
            ))}
        </div>
    );
}
