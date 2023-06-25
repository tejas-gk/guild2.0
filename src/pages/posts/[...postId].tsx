import usePost from '@/hooks/usePost';
import { useRouter } from 'next/router';
import Post from '@/components/Post';
import PostItem from '@/components/Post/PostItem';
export default function PostView() {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePost(postId as string);

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
