import React from 'react';
import {
    BeakerIcon,
    HomeIcon,
    SearchIcon,
    BellIcon,
    ChatIcon,
    PlusIcon,
    UserIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon, MenuIcon } from '@heroicons/react/solid';
export default function BottomMobNavb() {
    return (
        <div
            className='
            fixed
            bottom-0
            left-0
        '
        >
            <div
                className='
                bottom-mob-bar-small
                flex
                justify-around
                items-center
                bg-white
                px-4 py-2
                shadow-t-md
                z-50
                w-screen
                border border-gray-200
                gap-5
            '
            >
                <HomeIcon className='icon' />
                <SearchIcon className='icon' />
                <PlusIcon className='icon' />
                <ChatIcon className='icon' />
                <UserIcon className='icon' />
            </div>
        </div>
    );
}
