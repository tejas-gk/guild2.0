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
                className='
            rounded-md
            bg-white
            shadow
            max-h-40
            mt-1
            flex-1
             px-6 py-4
             relative
              '
            >
                <div>{header}</div>
                <div
                    className='
                    relative
                    max-h-40
                    w-full
                    overflow-clip
                '
                    ref={mainCardRef}
                >
                    {mainCardRef.current?.clientHeight === 160 ? (
                        <div
                            className='
                            absolute
                            bottom-0
                            left-0
                            h-24
                            w-full
                            bg-gradient-to-t from-gray-100 to-transparent
                            '
                        >
                            {image}
                        </div>
                    ) : null}
                    <div className='post-card-bottom'>
                        {info}
                        {action}
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
