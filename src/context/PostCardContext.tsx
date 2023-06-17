import { createContext, useContext } from 'react';

export type Post = {
    id: number;
    image: string;
    post: string;
    category: string;
    rating: { stars: number; reviews: number };
    price: number;
};

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
