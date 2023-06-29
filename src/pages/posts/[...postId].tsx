import usePosts from '@/hooks/usePosts';
import { useRouter } from 'next/router';
import Post from '@/components/Post';
import PostItem from '@/components/Post/PostItem';
export default function PostView() {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePosts(postId as string);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            <PostItem data={fetchedPost} />
            <Post isComment={true} postId={postId as string} />

            {fetchedPost?.comments?.map((comment: any) => (
                <div key={comment.id}>
                    <PostItem data={comment} />
                </div>
            ))}
        </div>
    );
}
