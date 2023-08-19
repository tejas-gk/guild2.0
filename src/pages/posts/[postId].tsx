import usePosts from '@/hooks/usePosts';
import { useRouter } from 'next/router';
import Post from '@/components/Post';
import PostItem from '@/components/Post/PostItem';
import { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import CommentsSection from '@/components/Post/Comments/CommentsSection';
import CreateComment from '@/components/Post/Comments';

interface Comment {
    id: string;
    user: {
        username: string;
    };
    body: string;
    childComments?: Comment[];
}

interface FetchedPost {
    comments?: Comment[];
}

export default function PostView() {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePosts(postId as string);

    const [reply, setReply] = useState<{ [commentId: string]: string }>({});
    const [comments, setComments] = useState<Comment[]>([]);

    const handleReply = async (commentId: string) => {
        try {
            const postIdString = Array.isArray(postId) ? postId[0] : postId;

            if (!postIdString || Array.isArray(postIdString)) {
                throw new Error('Invalid ID');
            }

            await axios.post(`/api/posts/comments?postId=${postIdString}`, {
                body: reply[commentId],
                parentId: commentId,
            });

            // Clear the reply input field after submitting the reply
            setReply((prevReply) => ({
                ...prevReply,
                [commentId]: '',
            }));
        } catch (error) {}
    };

    const handleChangeReply = (commentId: string, value: string) => {
        setReply((prevReply) => ({
            ...prevReply,
            [commentId]: value,
        }));
    };

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            <PostItem data={fetchedPost} />
            {/* <Post isComment postId={postId as string} /> */}
            <div className='ml-4'>
                <CreateComment postId={postId as string} />
            </div>

            {/* comments */}
            <CommentsSection postId={postId as string} />
        </div>
    );
}
