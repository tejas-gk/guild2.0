import usePosts from '@/hooks/usePosts';
import PostItem from './PostItem';

interface PostFeedProps {
    postId: string;
}

export default function PostFeed({
    postId,
}: PostFeedProps): React.ReactElement<React.ReactNode> {
    const { data: posts = [] } = usePosts();
    return (
        <div>
            {posts?.map((post: Record<string, any>) => (
                <div key={post.id} className='flex gap-4'>
                    <PostItem
                        postId={post.id}
                        body={post.body}
                        header={post.createdAt}
                        footer={post.likedIds.length}
                    />
                </div>
            ))}
        </div>
    );
}
