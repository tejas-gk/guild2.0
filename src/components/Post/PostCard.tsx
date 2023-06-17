import { ReactNode } from 'react';
import * as React from 'react';
import PostCardContext from '@/context/PostCardContext';
import PostImage from './PostImage';
import PostFooter from './PostFooter';
import PostText from './PostText';
import PostInfo from './PostInfo';
export type Post = {
    id: number;
    image: string;
    post: string;
    category: string;
    rating: { stars: number; reviews: number };
    price: number;
};
type Props = {
    post: Post;
    image?: ReactNode;
    info?: ReactNode;
    action?: ReactNode;
};

function PostCard({ image, info, action, post }: Props) {
    return (
        <PostCardContext.Provider value={{ post }}>
            <div className='post-card'>
                {image}
                <div className='post-card-bottom'>
                    {info}
                    {action}
                </div>
            </div>
        </PostCardContext.Provider>
    );
}

PostCard.Image = PostImage;
PostCard.Footer = PostFooter;
PostCard.Text = PostText;
PostCard.Info = PostInfo;
// PostCard.Category = PostCategory;
// PostCard.Rating = PostRating;
// PostCard.Price = PostPrice;

export default PostCard;
