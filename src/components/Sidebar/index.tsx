'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import Avatar from '../Post/Avatar';
import React from 'react';
interface Props {
    children?: React.ReactNode;
}
export default function Index({ children }: Props) {
    const { data: currentUser } = useCurrentUser();
    return (
        <div className='h-full bg-green-400'>
            <main
                className='
            lg:pl-20 h-full
            bg-red-300
          '
            >
                {children}
            </main>
        </div>
    );
}
