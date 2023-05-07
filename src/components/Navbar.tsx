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
                <p
                    className='
                            text-gray-500
                            font-semibold
                            truncate 
                            max-w-5 w-28
                            flex
                            items-center
                            space-x-2
                        '
                >
                    <Avatar seed={currentUser?.id} />
                    <ChevronDownIcon
                        className='
                        h-6 w-6
                        cursor-pointer
                    '
                        onClick={() =>
                            setIsProfileDropdownOpen(!isProfileDropdownOpen)
                        }
                    />
                    {isProfileDropdownOpen && (
                        <div>
                            <Dropdown
                                setIsOpen={setIsProfileDropdownOpen}
                                className='
                                w-[13rem]
                                left-auto
                                right-12
                                top-12
                                '
                            >
                                <Link href={`/users/${currentUser?.username}`}>
                                    Profile
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
                    className='
                hidden lg:flex
                items-center
                space-x-2
                justify-end
                border border-gray-200
                p-2
                cursor-pointer
            '
                    onClick={() => loginModal.onOpen()}
                >
                    <ArrowCircleDownIcon
                        className='
                        rounded-full
                        cursor-pointer
                        transition
                        duration-150
                        transform
                        hover:scale-110
                        h-6 w-6
                    '
                    />
                    <p
                        className='
                    text-gray-500
                    font-semibold
                '
                    >
                        Sign in
                    </p>
                </div>
            )}
        </div>
    );
}
