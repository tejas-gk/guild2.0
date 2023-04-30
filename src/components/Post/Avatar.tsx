import Image from 'next/image';
import React, { useCallback } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';
import useUsers from '@/hooks/useUsers';

interface AvatarProps {
    seed?: string;
    large?: boolean;
}

export default function Avatar({ seed, large = false }: AvatarProps) {
    const { data: currentUser } = useCurrentUser();
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
            h-12 w-12
            rounded-full
            border-gray-300
            bg-white
            ${large && 'h-12 w-12'}
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
                className='
                    absolute
                    top-0 left-0
                    object-cover
                    rounded-full
                '
                onClick={onClick}
            />
        </div>
    );
}
