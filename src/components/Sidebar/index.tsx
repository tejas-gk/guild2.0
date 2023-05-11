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
        <div className='h-full bg-green-400'>
            <div
                className='
                 lg:fixed
                lg:inset-y-0 
                lg:left-0
                lg:z-50
                lg:pb-4
                lg:mt-16
                bg-white
                lg:w-20
                lg:overflow-y-auto
                lg:flex
                lg:flex-col
                justify-between
            '
            >
                <div
                    className='
                        mx-auto
                        last:mt-auto
                        hidden lg:block
                    '
                >
                    <Avatar seed={currentUser?.id} />
                </div>
            </div>

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
