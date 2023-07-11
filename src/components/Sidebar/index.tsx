import useCurrentUser from '@/hooks/useCurrentUser';
import Avatar from '../Avatar';
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
export default function Index() {
    const { data: currentUser } = useCurrentUser();
    return (
        <div
            className='h-full
        bg-gray-100
        w-64 h-screen
        hidden md:block
        '
        >
            Sidebar
        </div>
    );
}
