'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import Avatar from '../Post/Avatar';
import React from 'react';
interface Props {
    children?: React.ReactNode;
}
export default function Index() {
    const { data: currentUser } = useCurrentUser();
    return (
        <div className='h-full bg-green-400'>
            <main
                className='
            lg:pl-20 h-full
            bg-red-300
          '
            >
                <ul>
                    <li>hello</li>
                </ul>

                <div
                    className='
                
              '
                >
                    <Avatar seed={currentUser?.id} />
                </div>
            </main>
        </div>
    );
}
