import useCurrentUser from '@/hooks/useCurrentUser';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Comment {
    id: string;
    body: string;
    createdAt: string;
    user: {
        id: string;
        username: string;
    };
}

interface CommentSectionProps {
    postId: string;
}

export default function CommentsSection({ postId }: CommentSectionProps) {
    const [reply, setReply] = useState('');

    const { data: currentUser } = useCurrentUser();
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(
                    `/api/posts/comments?postId=${postId}`
                );
                setComments(response.data);
                console.log(response.data, 'res');
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
        console.log(fetchComments, 'comm');
    }, [postId]);

    const handleReply = async () => {
        try {
            await axios.post('/api/posts/comments/reply', {
                postId,
                body: reply,
            });
        } catch (error) {
            console.error('Error replying to comment:', error);
        }
    };

    if (!currentUser) return null;

    return (
        <div className='flex flex-col gap-y-4 mt-4'>
            <div className='w-full h-px my-6' />
            {comments.map((comment) => (
                <div key={comment.id} className='border p-2'>
                    <p>{comment.body}</p>
                    <p>Posted by: {comment.user.username}</p>
                    <div className='w-full h-px my-6' />
                    <input
                        onChange={(e) => setReply(e.target.value)}
                        type='text'
                        placeholder='Reply...'
                        className='w-full p-2 mt-2 border rounded'
                    />
                    <div className='w-full h-px' />
                    <div className='flex justify-end'>
                        <button
                            onClick={handleReply}
                            className='px-4 py-2 text-sm text-white bg-blue-500 rounded'
                        >
                            Reply
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
