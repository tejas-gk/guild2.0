import { ReactNode } from 'react';
import * as React from 'react';
import PostCardContext from '@/context/PostCardContext';
import PostImage from './PostImage';
import PostFooter from './PostFooter';
import PostText from './PostText';
import PostInfo from './PostInfo';
import PostHeader from './PostHeader';
import { Post } from '@/types/post';

type Props = {
    post: Post;
    image?: ReactNode;
    info?: ReactNode;
    action?: ReactNode;
    header?: ReactNode;
};

function PostCard({ image, info, action, post, header }: Props) {
    const mainCardRef = React.useRef<HTMLDivElement>(null);

    return (
        <PostCardContext.Provider value={{ post }}>
            <div
                className='rounded-md
             bg-white
             shadow
             max-h
              mt-1
               flex-1
               px-6 py-4
               relative'
            >
                <div>{header}</div>
                <div
                    className='relative max-
                 w-full overflow-clip
                 flex flex-col'
                    ref={mainCardRef}
                >
                    <div className='mb-2'>{info}</div>
                    <div
                        className='w-full 
                    bg-gradient-to-t from-gray-100 to-transparent'
                    >
                        {image}
                    </div>
                    <div className='post-card-bottom'>
                        <div>{action}</div>
                    </div>
                </div>
            </div>
        </PostCardContext.Provider>
    );
}

PostCard.Image = PostImage;
PostCard.Footer = PostFooter;
PostCard.Text = PostText;
PostCard.Info = PostInfo;
PostCard.Header = PostHeader;

export default PostCard;
