import Image from 'next/image';
import React from 'react';

export default function Avatar() {
    return (
        <div>
            <Image
                src='https://api.dicebear.com/6.x/pixel-art/svg'
                width={40}
                height={40}
                alt='avatar'
            />
        </div>
    );
}
