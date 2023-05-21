import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import Avatar from '../Post/Avatar';

export default function UserBox({ data }: any) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios
            .post('/api/chat', {
                user_id: data.id,
            })
            .then((res) => {
                router.push(`/chats/${res.data.id}`);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [data.id, router]);
    return (
        <div
            onClick={handleClick}
            className='
                w-full
                relative
                flex
                items-center
                space-x-3
                p-3
                cursor-pointer
                hover:bg-gray-100
                rounded-xl
                transition duration-200 ease-in-out
                
            '
        >
            <Avatar seed={data.id} />
            <div
                className='
            flex 
            flex-col
            '
            >
                <div className='focus:outline-none'>
                    <div
                        className='
                    flex
                    justify-between
                    items-center
                    mb-1
                    '
                    >
                        <div className='text-sm font-bold text-gray-800'>
                            {data.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
