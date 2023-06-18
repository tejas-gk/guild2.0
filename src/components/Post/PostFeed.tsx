import usePosts from '@/hooks/usePosts';
import PostItem from './PostItem';
import Link from 'next/link';
import PostCard from './PostCard';
import Image from 'next/image';

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
        <div className='flex flex-col'>
            <PostCard
                post={{
                    id: 1,
                    image: 'https://iili.io/HCURIHu.jpg',
                    post: 'Viston Earl Grey Tea',
                    category: 'Black Tea',
                    price: 8.95,
                }}
                header={
                    <PostCard.Header>
                        <Image
                            src='https://iili.io/HCURIHu.jpg'
                            alt='user profile'
                            width={24}
                            height={24}
                            className='
                                    object-cover
                                    rounded-full

                                '
                        />
                        <Link href='/'>
                            <p
                                className='
                                underline underline-offset-2
                                text-zinc-900
                                text-sm
                                '
                            >
                                tejas
                            </p>
                        </Link>
                        <span className=''>.</span>
                        <p>
                            Posted by{' '}
                            <span className='text-zinc-900'>tejas</span>
                        </p>
                        <span className='text-zinc-900 text-sm'>1h ago</span>
                    </PostCard.Header>
                }
                image={<PostCard.Image />}
                info={
                    <PostCard.Info>
                        <PostCard.Text />
                    </PostCard.Info>
                }
                action={
                    <PostCard.Footer onClick={() => {}}>
                        {/* <MessageSquare size={16} /> */}
                        Comments
                    </PostCard.Footer>
                }
            />
            {posts?.map((post: Record<string, any>) => (
                <div key={post.id} className='gap-4 mx-4 mt-4'>
                    <PostItem data={post} />
                </div>
            ))}
        </div>
    );
}
