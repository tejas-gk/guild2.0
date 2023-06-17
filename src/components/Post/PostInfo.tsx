import * as React from 'react';
import { ReactNode } from 'react';

export type Props = {
    children: ReactNode;
};

function PostInfo({ children }: Props) {
    return <div className='product-info'>{children}</div>;
}

export default PostInfo;
