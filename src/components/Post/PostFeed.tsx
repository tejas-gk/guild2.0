import usePosts from '@/hooks/usePosts';
import PostItem from './PostItem';
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
            {/* <PostCard
                post={{
                    id: 1,
                    image: 'https://iili.io/HCURIHu.jpg',
                    post: 'Viston Earl Grey Tea lorem ipsum dolor mdekmkdddddddddddddddddddddddddd',
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
                        <p
                            className='text-zinc-900 
                        text-xs'
                        >
                            1h ago
                        </p>
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
                       
                        Comments
                    </PostCard.Footer>
                />
             */}
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
