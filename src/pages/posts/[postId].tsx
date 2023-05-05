import usePost from '@/hooks/usePost';
import { useRouter } from 'next/router';
import Post from '@/components/Post';
import { io } from 'socket.io-client';
import PostItem from '@/components/Post/PostItem';
export default function PostView() {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePost(postId as string);

    const socket = io('http://localhost:3000'); // replace with your server URL

    const likePost = (postId: any) => {
        socket.emit('like-post', { postId });
    };
    return (
        <div>
            <PostItem data={fetchedPost} />
            <Post isComment={true} postId={postId as string} />
            <button onClick={() => likePost(postId)}>Like</button>

            {fetchedPost?.comments?.map((comment: any) => (
                <div key={comment.id}>
                    <PostItem data={comment} />
                </div>
            ))}
        </div>
    );
}
