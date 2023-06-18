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
} from '@heroicons/react/outline';
import { ChevronDownIcon, MenuIcon } from '@heroicons/react/solid';
import { Inter, Roboto } from 'next/font/google';
import Dropdown from '@/components/Dropdown';
import Link from 'next/link';
import { useLoginModal } from '@/hooks/useModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import Avatar from '@/components/Post/Avatar';
import Button from '@/components/Button';
import { signOut } from 'next-auth/react';
import { pusherClient } from '@/lib/pusher';

// const InterFont = Inter({
//     subsets: ['latin'],
//     variable: '--font-inter',
// });

export default function Tets() {
    const { data: currentUser } = useCurrentUser();
    // TODO this needs to be separate
    // const [isOpen, setIsOpen] = useState(false);
    const [notified, setNotified] = useState<boolean | undefined>(
        currentUser?.hasNotification
    );
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    // const loginModal = useLoginModal();

    useEffect(() => {
        if (currentUser?.hasNotification) {
            setNotified(true);
        }
    }, [currentUser?.hasNotification]);

    // useEffect(() => {
    //     const pusherChannel = pusherClient.subscribe(
    //         `notifications-${currentUser?.id}`
    //     );
    //     // pusherChannel.bind('read', () => {
    //     //     setNotified(false);
    //     // });

    //     return () => {
    //         // pusherChannel.unbind('read');
    //         // pusherClient.unsubscribe(`notifications-${currentUser?.id}`);
    //     };
    // }, [currentUser?.id]);

    return (
        <div>
            <button>Sign in</button>
            <Button title='Post' onClick={() => {}}>
                hello
            </Button>

            <input
                type='text'
                className='
                border-0
                '
            />
        </div>
    );
}
