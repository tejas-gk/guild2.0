import Image from 'next/image';
import React, { useCallback } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import useUsers from '@/hooks/useUsers';
import Link from 'next/link';

interface AvatarProps {
    seed?: string;
    size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra-large';
}
interface SubClasses {
    [key: string]: string;
}

const sizeVariants: SubClasses = {
    'tiny': 'w-5 aspect-square',
    'small': 'w-8 aspect-square',
    'medium': 'w-10 aspect-square',
    'large': 'w-12 aspect-square',
    'extra-large': 'w-16 aspect-square',
};

export default function Avatar({ seed, size }: AvatarProps) {
    const router = useRouter();
    const { data: user } = useUsers(seed);

    const onClick = useCallback(
        (event: any) => {
            event.stopPropagation();

            const url = `/users/${seed}`;

            router.push(url);
        },
        [router, seed]
    );

    return (
        <div
            className={`
            relative
            rounded-full
            border-gray-300
            bg-white
            cursor-pointer
            ${size ? sizeVariants[size] : ''}

        `}
        >
            <Image
                src={
                    user?.profileImage ||
                    `https://ui-avatars.com/api/?name=${user?.name}&&background=random`
                }
                width={60}
                height={60}
                alt='avatar'
                className={`
                    absolute
                    top-0 left-0
                    object-cover
                    rounded-full
                    w-16 aspect-square
                    ${size ? sizeVariants[size] : ''}
                `}
                onClick={onClick}
            />
        </div>
    );
}
