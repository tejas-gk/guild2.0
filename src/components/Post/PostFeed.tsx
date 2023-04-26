import usePosts from '@/hooks/usePosts';
import React from 'react';

export default function PostFeed() {
    const { data: posts = [] } = usePosts();
    return (
        <div>
            {posts?.map((post: Record<string, any>) => (
                <div key={post._id}>
                    <h1>{post.body}</h1>
                </div>
            ))}
        </div>
    );
}
