import usePosts from '@/hooks/usePosts';
import { useRouter } from 'next/router';
import Post from '@/components/Post';
import PostItem from '@/components/Post/PostItem';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import CommentItem from '@/components/Post/Comment';

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

    if (isLoading) {
        return <div>Loading ...</div>;
    }

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

    const dummyComments = [
        {
            id: 'comment1',
            user: {
                username: 'user1',
            },
            body: 'Comment 1',
            childComments: [
                {
                    id: 'reply1',
                    user: {
                        username: 'user2',
                    },
                    body: 'Reply 1',
                },
                {
                    id: 'reply2',
                    user: {
                        username: 'user3',
                    },
                    body: 'Reply 2',
                },
            ],
        },
        {
            id: 'comment2',
            user: {
                username: 'user4',
            },
            body: 'Comment 2',
        },
        // Add more comments and replies as needed
    ];

    return (
        <div>
            <PostItem data={fetchedPost} />
            <Post isComment postId={postId as string} />

            {dummyComments?.map((comment: Comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    postId={postId as string}
                    onDeleteComment={(commentId: string) => {
                        alert('Comment deleted successfully');
                    }}
                />
            ))}
        </div>
    );
}
