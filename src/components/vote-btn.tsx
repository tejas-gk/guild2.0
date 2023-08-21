import styles from '@/styles/vote.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { pusherClient } from '@/lib/pusher';

export default function VoteBtn({ postId }: any) {
    const [upvote, setUpvote] = useState(false);
    const [downvote, setDownvote] = useState(false);
    const [voteCount, setVoteCount] = useState(0);

    useEffect(() => {
        const channel = pusherClient.subscribe(`post-${postId}`);
        channel.bind('vote', (data: any) => {
            setVoteCount(data.countVotes);
        });
        return () => {
            pusherClient.unsubscribe(`post-${postId}`);
        };
    }, []);

    useEffect(() => {
        const getTotalVotes = async () => {
            const { data } = await axios.get(`/api/vote?postId=${postId}`);
            console.log(data);
            setVoteCount(data.countVotes);
        };
        getTotalVotes();
    }, []);

    return (
        <div
            className={`vote-btn 
            text-primary
            bg-background
            flex
            items-center
            flex-col
            justify-center
            m-4
            pt-[.5rem] p-3
            w-4
            rounded-[.5rem]
            box-content
            self-start
        `}
        >
            <form method='post'>
                <button
                    className={`btn btn-primary btn-sm 
                        cursor-pointer
                        object-scale-down
                        border-none
                        pr-[.5rem]
                        relative
                    `}
                    onClick={(e) => {
                        e.preventDefault();
                        setUpvote(!upvote);
                        setDownvote(false);
                        axios.post('/api/vote', {
                            postId,
                            vote: 'UP',
                        });
                    }}
                >
                    {upvote ? (
                        <span className='text-red-500'>+</span>
                    ) : (
                        <span className='text-gray-500'>+</span>
                    )}
                </button>
            </form>
            <span
                className={`
                p-3
                pt-[.5rem]
                text-2xl
                relative
                font-bold
            `}
            >
                {voteCount || 0}
            </span>
            <button
                className={`btn btn-primary btn-sm 
                cursor-pointer
                        object-scale-down
                        border-none
                        pr-[.5rem]
                        relative
                `}
                onClick={() => {
                    setDownvote(!downvote);
                    setUpvote(false);
                    setVoteCount(downvote ? voteCount + 1 : voteCount - 1);
                    axios.post('/api/vote', {
                        postId,
                        vote: 'DOWN',
                    });
                }}
            >
                {downvote ? (
                    <span className='text-blue-500'>-</span>
                ) : (
                    <span className='text-gray-500'>-</span>
                )}
            </button>
        </div>
    );
}
