import usePosts from '@/hooks/usePosts';
import { useRouter } from 'next/router';
import Post from '@/components/Post';
import PostItem from '@/components/Post/PostItem';
import { useState } from 'react';
import axios from 'axios';

export default function PostView() {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePosts(postId as string);

    const [reply, setReply] = useState({});

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    const handleReply = async (commentId: string) => {
        try {
            const postIdString = Array.isArray(postId) ? postId[0] : postId;

            console.log('postId', postIdString, reply[commentId]);
            if (!postIdString || Array.isArray(postIdString)) {
                throw new Error('Invalid ID');
            }

            await axios.post('/api/posts/comments', {
                body: reply[commentId], // Access the specific reply value using the commentId
                postId: postIdString,
                parentId: commentId,
            });

            // Clear the reply input field after submitting the reply
            setReply((prevReply) => ({
                ...prevReply,
                [commentId]: '',
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeReply = (commentId: string, value: string) => {
        setReply((prevReply) => ({
            ...prevReply,
            [commentId]: value,
        }));
    };

    return (
        <div>
            <PostItem data={fetchedPost} />
            <Post isComment={true} postId={postId as string} />

            {fetchedPost?.comments?.map((comment: any) => (
                <div key={comment.id}>
                    user: {comment.user.username} <br />
                    body: {comment.body} <br />
                    {comment.replies?.map((reply: any) => (
                        <div key={reply.id}>
                            user: {reply.user.username} <br />
                            body: {reply.body} <br />
                        </div>
                    ))}
                    {reply[comment.id]}
                    {comment?.parentId}
                    <input
                        type='text'
                        placeholder='comment'
                        value={reply[comment.id] || ''}
                        onChange={(e) =>
                            handleChangeReply(comment.id, e.target.value)
                        }
                    />
                    <button onClick={() => handleReply(comment.id)}>
                        Submit
                    </button>
                    <hr />
                </div>
            ))}
        </div>
    );
}
