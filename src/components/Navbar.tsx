import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import {
    AiFillBell,
    AiFillGithub,
    AiOutlineBell,
    AiOutlineSetting,
} from 'react-icons/ai';
import {
    BsBookFill,
    BsBookmark,
    BsBookmarkFill,
    BsFillChatFill,
} from 'react-icons/bs';
import {
    IoChatbubblesOutline,
    IoChatbubblesSharp,
    IoSettings,
} from 'react-icons/io5';
import { useRouter } from 'next/router';
import useGuild from '@/hooks/useGuild';
import Logo from './Logo';

const InterFont = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export default function Navbar() {
    const { data: currentUser, isLoading } = useCurrentUser();
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

    const { data: guildData } = useGuild();

    const joinedGuilds = useCallback(() => {
        if (guildData && currentUser) {
            console.table(currentUser.joinedIds[0]);
            const joinedGuildIds = currentUser.joinedIds || [];
            const joinedGuilds = guildData.filter((guild: any) =>
                joinedGuildIds.includes(guild.id)
            );
            return joinedGuilds;
        }
        return [];
    }, [guildData, currentUser]);

    const [filteredGuilds, setFilteredGuilds] = useState(joinedGuilds());

    useEffect(() => {
        setFilteredGuilds(joinedGuilds());
    }, [guildData, currentUser]);

    const logout = async () => {
        await signOut();
    };
    const handleToggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className='items-center bg-white px-4 py-2 shadow-md sticky top-0 z-10 flex justify-between md:hidden'>
                <Link href='/'>
                    <Logo />
                </Link>
                <div>
                    <MenuIcon className='icon' onClick={handleToggleDrawer} />
                </div>

                <div
                    className={`${
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden 
                        fixed top-0 right-0
                         bg-white shadow-md
                          h-screen w-[calc(100vw-20%)]
                          transform transition-transform
                          ease-in-out duration-300
                          `}
                >
                    <h1
                        className='text-2xl font-bold text-center py-3
                    mb-5
                    border-b-2 border-gray-200
                    '
                    >
                        Guild
                    </h1>
                    {guildData?.map((guild: any) => (
                        <div key={guild.id} className=' py-3 ml-5'>
                            <Link href={`/guild/${guild.id}`}>
                                <div
                                    className='flex 
                            flex-row
                            items-center'
                                >
                                    <div
                                        className='flex
                                 items-center justify-center w-10 h-10 rounded-full
                                  bg-gray-200'
                                    >
                                        <Avatar seed={guild.id} size='medium' />
                                    </div>
                                    <p className='ml-2'>{guild.name}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* desktop view */}
            <div
                className='
            items-center
            bg-white
            px-4 py-2
            shadow-md
            sticky top-0
            z-10
            hidden md:flex
            '
            >
                <Link href='/'>
                    <Logo />
                </Link>

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
                                                        seed={guild.id}
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
                    onSubmit={(e: any) => {
                        e.preventDefault();
                        router.push(`/search?q=${e.target[0].value}`);
                    }}
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
                    <Link href='https://github.com/tejas-gk/guild2.0'>
                        <AiFillGithub className='icon' />
                    </Link>
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
                    <Link href='/bookmarks'>
                        {router.pathname === '/bookmarks' ? (
                            <BsBookmarkFill className='icon' />
                        ) : (
                            <BsBookmark className='icon' />
                        )}
                    </Link>
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
                                    <Link href={`/users/${currentUser?.id}`}>
                                        <div
                                            className='
                                        navbar-dropdown
                                        '
                                        >
                                            <UserCircleIcon className='icon' />
                                            <p>Profile</p>
                                        </div>
                                    </Link>
                                    <Link href={`settings`}>
                                        <div
                                            className='
                                        navbar-dropdown
                                        '
                                        >
                                            <AiOutlineSetting className='icon' />
                                            <p>Settings</p>
                                        </div>
                                    </Link>
                                    <div
                                        className='
                                            navbar-dropdown
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
                ) : isLoading ? (
                    <div>Loading</div>
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
        </>
    );
}
