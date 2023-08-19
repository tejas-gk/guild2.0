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
export default function Tet() {
    return (
        <div>
            <div className='items-center bg-white px-4 py-2 shadow-md sticky top-0 z-10 flex justify-between md:hidden'>
                <Logo />
                <div>
                    <MenuIcon className='icon' onClick={() => {}} />
                </div>

                <div
                    className={`${
                        true ? 'translate-x-0' : 'translate-x-full'
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
                </div>
            </div>
        </div>
    );
}
