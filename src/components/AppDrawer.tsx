import React from 'react';
import Avatar from './Avatar';
import { User } from '@prisma/client';
import Logo from './Logo';
import { MenuIcon } from '@heroicons/react/outline';

interface NavAvatarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavAvatar({ isOpen, setIsOpen }: NavAvatarProps) {
    const handleToggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    return (
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
            <p className='py-4'>Guild 1</p>
            <p className='py-4'>Guild 2</p>
        </div>
    );
}
