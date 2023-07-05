import { createContext, useContext } from 'react';
import { Post } from '@/types/post';

const PostCardContext = createContext<{ post: Post } | null>(null);

export function usePostCardContext() {
    const context = useContext(PostCardContext);
    if (!context) {
        throw new Error(
            'PostCard.* component must be rendered as child of PostCard component'
        );
    }
    return context;
}

export default PostCardContext;
