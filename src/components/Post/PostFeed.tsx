import usePosts from '@/hooks/usePosts';
import PostItem from './PostItem';
import Link from 'next/link';
import PostCard from './PostCard';

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
        <div className=''>
            {/* <PostCard
                post={{
                    id: 1,
                    image: 'https://iili.io/HCURIHu.jpg',
                    post: 'Viston Earl Grey Tea',
                    category: 'Black Tea',
                    rating: { stars: 4, reviews: 4 },
                    price: 8.95,
                }}
                image={<PostCard.Image />}
                info={
                    <PostCard.Info>
                        <PostCard.Text />
                    </PostCard.Info>
                }
                action={
                    <PostCard.Footer onClick={() => {}}>
                        Add to cart
                    </PostCard.Footer>
                }
            /> */}
            {posts?.map((post: Record<string, any>) => (
                <div key={post.id} className='gap-4 mx-4 mt-4'>
                    <PostItem data={post} />
                </div>
            ))}
        </div>
    );
}
