import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
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
    UserCircleIcon,
    LogoutIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon, MenuIcon } from '@heroicons/react/solid';
import { Inter, Roboto } from 'next/font/google';
import Dropdown from './Dropdown';
import Link from 'next/link';
import { useLoginModal } from '@/hooks/useModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import Avatar from './Avatar';
import Button from '@/components/Button';
import { signOut } from 'next-auth/react';
import { pusherClient } from '@/lib/pusher';
import axios from 'axios';
import { AiFillBell, AiOutlineBell } from 'react-icons/ai';
import { BsFillChatFill } from 'react-icons/bs';
import { IoChatbubblesOutline, IoChatbubblesSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';

const InterFont = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export default function Navbar() {
    const { data: currentUser } = useCurrentUser();
    // TODO this needs to be separate
    const [isOpen, setIsOpen] = useState(false);
    const [notified, setNotified] = useState<boolean | undefined>(
        currentUser?.hasNotification
    );
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const loginModal = useLoginModal();
    const router = useRouter();

    useEffect(() => {
        if (currentUser?.hasNotification) {
            setNotified(true);
        }
    }, [currentUser?.hasNotification]);

    useEffect(() => {
        const pusherChannel = pusherClient.subscribe(
            `notifications-${currentUser?.id}`
        );
        pusherChannel.bind('read', () => {
            setNotified(false);
        });

        return () => {
            pusherChannel.unbind('read');
            pusherClient.unsubscribe(`notifications-${currentUser?.id}`);
        };
    }, [currentUser?.id]);

    const [guildData, setGuildData] = useState([]);

    useEffect(() => {
        const fetchGuildData = async () => {
            try {
                const response = await axios.get(`/api/guild`);
                setGuildData(response.data);
                console.log(guildData, 'guild data');
            } catch (error) {
                console.log('Error fetching guild data:', error);
            }
        };

        fetchGuildData();
    }, []);

    const logout = async () => {
        await signOut();
    };

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
                                {guildData?.map((guild: any) => (
                                    <li key={guild.id}>
                                        <Link href={`/guild/${guild.id}`}>
                                            <div
                                                className='
                                                    flex
                                                    items-center
                                                    space-x-2
                                                    px-4 py-2
                                                    hover:bg-gray-200
                                                    rounded-md
                                                    transition
                                                    duration-200
                                                    ease-in-out
                                                    cursor-pointer
                                                '
                                            >
                                                <Avatar
                                                    seed={guild.iconUrl}
                                                    size='medium'
                                                />
                                                <p>{guild.name}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
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
                <SparklesIcon className='icon cursor-not-allowed' />
                <GlobeIcon className='icon cursor-not-allowed' />
                <PlusIcon className='icon cursor-not-allowed' />
                <div
                    className='
                    flex
                    items-center
                    space-x-1
                    bg-gray-100
                    rounded-lg
                    px-2 py-1
                    cursor-not-allowed
                '
                >
                    <SpeakerphoneIcon className='icon' />
                    Promote
                </div>
                <VideoCameraIcon className='icon cursor-not-allowed' />
                <Link href='/chats'>
                    {router.pathname === '/chats' ? (
                        <IoChatbubblesSharp className='icon' />
                    ) : (
                        <IoChatbubblesOutline className='icon' />
                    )}
                </Link>

                <div
                    className='
                relative
                '
                >
                    <Link href='/notifications'>
                        {router.pathname === '/notifications' ? (
                            <AiFillBell className='icon' />
                        ) : (
                            <AiOutlineBell className='icon' />
                        )}
                    </Link>
                    {notified && (
                        <div
                            className='
                            bg-blue-600
                            h-3 w-3
                            rounded-full
                            absolute
                            top-1
                            right-1
                            
                            '
                        />
                    )}
                </div>
            </div>

            {currentUser ? (
                <div
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
                    <Avatar seed={currentUser?.id} size='medium' />
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
                        <div
                            className='
                                absolute 
                        right-0 
                        mt-8 
                        w-[12rem] 
                            '
                        >
                            <Dropdown
                                setIsOpen={setIsProfileDropdownOpen}
                                className='
                                left-auto
                                right-12
                                top-3
                                '
                            >
                                <Link href='/profile'>
                                    <div
                                        className='
                                            flex
                                            items-center
                                            space-x-2
                                            px-2
                                            hover:bg-gray-200
                                            rounded-md
                                            transition
                                            duration-200
                                            ease-in-out
                                            cursor-pointer
                                        '
                                    >
                                        <UserCircleIcon className='icon' />
                                        <p>Profile</p>
                                    </div>
                                </Link>
                                <div
                                    className='
                                            flex
                                            items-center
                                            space-x-2
                                            px-2
                                            hover:bg-gray-200
                                            rounded-md
                                            transition
                                            duration-200
                                            ease-in-out
                                            cursor-pointer
                                        '
                                    onClick={() => logout()}
                                >
                                    <LogoutIcon className='icon' />
                                    <p>Logout</p>
                                </div>
                            </Dropdown>
                        </div>
                    )}
                </div>
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
