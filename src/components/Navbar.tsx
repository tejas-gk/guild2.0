import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    BeakerIcon,
    HomeIcon,
    SearchIcon,
    BellIcon,
    ChatIcon,
    PlusIcon,
    SpeakerphoneIcon,
    VideoCameraIcon,
    SparklesIcon,
    GlobeIcon,
    ArrowCircleDownIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon, MenuIcon } from '@heroicons/react/solid';
import { Inter, Roboto } from 'next/font/google';
import Dropdown from './Dropdown';
import Link from 'next/link';
import { useLoginModal } from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import Avatar from './Post/Avatar';
import Button from '@/components/Button';
import { signOut } from 'next-auth/react';

const InterFont = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export default function Navbar() {
    const { data: currentUser } = useCurrentUser();
    // TODO this needs to be separate
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const loginModal = useLoginModal();

    return (
        <div
            className='
            flex
            items-center
            bg-white
            px-4 py-2
            shadow-md
            sticky top-0
            z-10
        '
        >
            <div
                className='
                relative
                h-10
                w-20
                flex-shrink-0
                cursor-pointer
                flex
                items-center
            '
            >
                <Link href='/'>
                    <h1
                        className={`
                        text-3xl
                        font-bold
                        text-red-500
                        cursor-pointer
                        ${InterFont.className}  
                    `}
                    >
                        Guild
                    </h1>
                </Link>
            </div>

            <div
                className='
                flex
                flex-1
                items-center
                flex-row
                mx-7
                relative
            '
            >
                <HomeIcon
                    className='
                        h-6 w-6
                        cursor-pointer
                    '
                />
                <p
                    className='
                    hidden md:inline-flex
                    ml-2
                    flex-1
                '
                >
                    Home
                </p>
                <ChevronDownIcon
                    className='
                        h-6 w-6
                        cursor-pointer
                    '
                    onClick={() => setIsOpen(!isOpen)}
                />
                {isOpen && (
                    <div>
                        <Dropdown setIsOpen={setIsOpen}>
                            <ul>
                                <li>Hello</li>
                            </ul>
                        </Dropdown>
                    </div>
                )}
            </div>

            <form
                className='
            flex 
            flex-1
            items-center
            space-x-2
            rounded-sm
            px-3 py-1
            lg:border lg:border-gray-200
            lg:bg-gray-100
            '
            >
                <SearchIcon
                    className='
                        h-6 w-6
                        cursor-pointer
                        text-gray-500
                        hidden lg:inline-flex
                    '
                />
                <input
                    type='text'
                    placeholder='Search'
                    className='
                        outline-none
                        flex-1
                        bg-transparent
                        hidden md:inline-flex
                    '
                />
            </form>

            <div
                className='
                mx-5
                items-center
                hidden lg:inline-flex
                space-x-2
            '
            >
                <SparklesIcon className='icon' />
                <GlobeIcon className='icon' />
                <PlusIcon className='icon' />
                <div
                    className='
                    flex
                    items-center
                    space-x-1
                    bg-gray-100
                    rounded-lg
                    px-2 py-1
                '
                >
                    <SpeakerphoneIcon className='icon' />
                    Promote
                </div>
                <VideoCameraIcon className='icon' />
                <ChatIcon className='icon' />
                <BellIcon className='icon' />
            </div>

            <div
                className='
                flex lg:hidden
                items-center
                '
            >
                <MenuIcon className='icon' />
            </div>
            {currentUser ? (
                <p className='text-gray-500 font-semibold truncate max-w-[5rem] flex items-center space-x-2 justify-end'>
                    <Avatar seed={currentUser?.id} />
                    <ChevronDownIcon
                        className='h-6 w-6 cursor-pointer'
                        onClick={() =>
                            setIsProfileDropdownOpen(!isProfileDropdownOpen)
                        }
                    />
                    {isProfileDropdownOpen && (
                        <div className='absolute right-0 mt-8 w-[12rem]'>
                            <Dropdown setIsOpen={setIsProfileDropdownOpen}>
                                <Link
                                    href={`/users/${currentUser?.username}`}
                                    className='flex items-center space-x-2'
                                >
                                    <div className='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                                        <svg
                                            className='absolute w-12 h-12 text-gray-400 -left-1'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                                                clipRule='evenodd'
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className='flex'>Profile</div>
                                </Link>

                                <Link
                                    href='/settings'
                                    className='mt-4 mb-4 flex items-center space-x-2'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='black'
                                        className='w-6 h-6 cursor-pointer'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
                                        />
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                        />
                                    </svg>
                                    <div className='flex'>Settings</div>
                                </Link>
                                <Button
                                    title='Sign Out'
                                    onClick={() => signOut()}
                                    sizing='sm'
                                    colors='none'
                                />
                            </Dropdown>
                        </div>
                    )}
                </p>
            ) : (
                <div
                    className='hidden lg:flex items-center space-x-2 justify-end border border-gray-200 p-2 cursor-pointer'
                    onClick={() => loginModal.onOpen()}
                >
                    <ArrowCircleDownIcon className='rounded-full cursor-pointer transition duration-150 transform hover:scale-110 h-6 w-6' />
                    <p className='text-gray-500 font-semibold'>Sign in</p>
                </div>
            )}
        </div>
    );
}
