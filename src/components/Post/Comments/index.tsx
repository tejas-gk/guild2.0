import React, { useState } from 'react';
import Button from '@/components/Button';
import axios from 'axios';
interface CommemtSectionProps {
    postId: string;
}
export default function Index({ postId }: CommemtSectionProps) {
    const [body, setBody] = useState([]);

    const handleSubmit = async () => {
        console.log(postId, body);
        try {
            const postIdString = Array.isArray(postId) ? postId[0] : postId;

            if (!postIdString || Array.isArray(postIdString)) {
                throw new Error('Invalid ID');
            }

            await axios.post(`/api/posts/comments`, {
                body,
                postId: postIdString,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className='
        grid 
        w-full
        gap-1.5
      '
        >
            <label htmlFor='comment'>Comments</label>
            <div className='mt-2'>
                <textarea
                    onChange={(e: any) => setBody(e.target.value)}
                    placeholder='Add a comment'
                    className='
              flex
              min-h-[80px]
              w-full
              rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
 '
                ></textarea>
            </div>
            <div className='flex justify-end'>
                <Button colors='primary' onClick={handleSubmit}>
                    Comment
                </Button>
            </div>
        </div>
    );
}
