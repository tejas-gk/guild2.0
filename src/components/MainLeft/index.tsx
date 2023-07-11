import { HomeIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

export default function index() {
    return (
        <div
            className='
        hidden md:block
        overflow-x-hidden
        rounded-lg border-2 border-gray-300
        w-full h-[calc(100vh-8.4rem)]
        ml-4
    '
        >
            <div
                className='
            bg-emerald-100
            px-6 py-4
            flex
            items-center
            gap-1.5
            rounded-t-lg
            font-bold
        '
            >
                <HomeIcon className='h-6 w-6' />
                <h1
                    className='text-xl 
                capitalize
            '
                >
                    Home
                </h1>
            </div>
            <div
                className='
            px-6 py-4
            text-sm
            text-zinc-500
            divide-y-2
            divide-zinc-500
        '
            >
                <p>
                    This is a social media app where users can create profiles,
                    connect with friends, share posts, photos, and videos, and
                    engage with other users through likes, comments, and direct
                    messaging. The app is built using Next js and features a
                    responsive design, real-time updates, and secure user
                    authentication.
                </p>
                <Link href='/guild'>
                    <p
                        className='
                    text-emerald-500
                    hover:underline
                    cursor-pointer
                '
                    >
                        Create a Guild
                    </p>
                </Link>
            </div>
        </div>
    );
}
