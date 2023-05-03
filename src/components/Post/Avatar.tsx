import Image from 'next/image';
import React, { useCallback } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router';

interface AvatarProps {
    seed?: string;
    large?: boolean;
}

export default function Avatar({ seed, large = false }: AvatarProps) {
    const { data: currentUser } = useCurrentUser();
    const router = useRouter();

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
                h-20 w-20
                rounded-full
                border-4 border-white
                shadow-md
                ${large && 'h-16 w-16'}
            `}
        >
            <Image
                src={
                    currentUser?.profileImage ||
                    `https://ui-avatars.com/api/?name=${currentUser?.name}&&background=random`
                }
                width={120}
                height={120}
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
