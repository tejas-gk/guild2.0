import useCurrentUser from '@/hooks/useCurrentUser';
import Avatar from '../Post/Avatar';
import React from 'react';
interface Props {
    children?: React.ReactNode;
}

const item = [
    {
        name: 'Home',
        icon: 'home',
        href: '/',
    },
    {
        name: 'account',
        icon: 'account',
        href: '/',
    },
];
export default function Index({ children }: Props) {
    const { data: currentUser } = useCurrentUser();
    return (
        <div className='h-full '>
            <main
                className='
                 h-full
                '
            >
                {children}
            </main>
        </div>
    );
}
