import usePost from '@/hooks/usePost';
import { useRouter } from 'next/router';
import Post from '@/components/Post';
export default function PostView() {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePost(postId as string);
    return (
        <div>
            <h1>{fetchedPost?.body}</h1>
            <Post isComment={true} postId={postId as string} />
            {fetchedPost?.comments?.map((comment: any) => (
                <div key={comment.id}>
                    user: {comment.user.name}
                    <h1>{comment.body}</h1>
                </div>
            ))}
        </div>
    );
}
