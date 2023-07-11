import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/useToast';

interface Comment {
    id: string;
    user: {
        username: string;
    };
    body: string;
    childComments?: Comment[];
    parentId?: string;
}

interface CommentProps {
    comment: Comment;
    postId: string;
    onDeleteComment: (commentId: string) => void;
}

const CommentItem: React.FC<CommentProps> = ({
    comment,
    postId,
    onDeleteComment,
}) => {
    const [reply, setReply] = useState<{ [commentId: string]: string }>({});

    const toast = useToast();

    const handleReply = async (commentId: string) => {
        try {
            await axios.post(`/api/posts/comments?postId=${postId}`, {
                body: reply[commentId],
                parentId: commentId,
            });

            setReply((prevReply) => ({
                ...prevReply,
                [commentId]: '',
            }));

            toast.success('Reply submitted successfully');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    const handleChangeReply = (commentId: string, value: string) => {
        setReply((prevReply) => ({
            ...prevReply,
            [commentId]: value,
        }));
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await axios.delete(`/api/posts/comments/${commentId}`);

            onDeleteComment(commentId);

            toast.success('Comment deleted successfully');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className='ml-4'>
            <div className='flex items-center'>
                <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
                <div className='ml-2 text-sm font-medium'>
                    {comment.user.username}
                </div>
            </div>
            <div className='mt-1'>{comment.body}</div>

            <div className='ml-4 mt-2 space-y-2 bg-red-500'>
                {comment.childComments?.map((reply: Comment) => (
                    <CommentItem
                        key={reply.id}
                        comment={reply}
                        postId={postId}
                        onDeleteComment={onDeleteComment}
                    />
                ))}
            </div>

            <div className='flex mt-2'>
                <input
                    type='text'
                    placeholder='Reply...'
                    value={reply[comment.id] || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChangeReply(comment.id, e.target.value)
                    }
                    className='w-full py-1 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400'
                />
                <button
                    onClick={() => handleReply(comment.id)}
                    className='ml-2 px-4 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none'
                >
                    Submit
                </button>
            </div>

            <div className='flex mt-2'>
                <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className='px-4 py-1 text-sm font-medium text-red-500 rounded hover:bg-red-500 hover:text-white focus:outline-none'
                >
                    Delete
                </button>
            </div>

            <hr className='my-2' />
        </div>
    );
};

export default CommentItem;
