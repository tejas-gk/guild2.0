import Image from 'next/image';
import React from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';

interface AvatarProps {
    seed?: string;
    large?: boolean;
}

export default function Avatar({ seed, large = false }: AvatarProps) {
    const { data: currentUser } = useCurrentUser();
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
                src={`https://ui-avatars.com/api/?name=${currentUser?.name}&&background=random`}
                width={60}
                height={60}
                alt='avatar'
                className='
                    absolute
                    top-0 left-0
                    
                    rounded-full
                '
            />
        </div>
    );
}
