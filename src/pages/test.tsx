import Avatar from '@/components/Post/Avatar';
import React from 'react';
import { HeartIcon, MailIcon } from '@heroicons/react/outline';

export default function test() {
    return (
        <div>
            <div
                className='
           
        
             border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        transition
          '
            >
                <div
                    className='
                flex
                flex-row
                items-start
                
            
                p-2
                rounded-md
                mb-2
                ml-2
                '
                >
                    <Avatar />

                    <p
                        className='
                    text-gray-700
                    font-semibold
                    text-sm
                    ml-2
                    mt-0.5
                    '
                    >
                        Tejas
                    </p>
                    <p
                        className='
                    text-gray-700
                    ml-2
                    '
                    >
                        @tejas
                    </p>
                    <div className='ml-auto'>
                        <span className='text-neutral-500 text-sm'>1h</span>
                    </div>
                </div>
                <div>
                    <p
                        className='
                    text-gray-700
                    '
                    >
                        lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, voluptates.
                    </p>
                </div>

                <div className='flex flex-row items-center mt-3 gap-10'>
                    <div
                        className='
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            '
                    >
                        <MailIcon className='icon' />
                        <p>0</p>
                    </div>
                    <div
                        className='
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            '
                    >
                        <HeartIcon className='icon' />
                        <p>0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
