import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import { PhotographIcon } from '@heroicons/react/outline';

export default function Index() {
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
    };
    return (
        <>
            <form
                className='
                    rounded-md
                    bg-white
                    shadow-md
                    border-gray-300
                    p-2
                    mx-2
                    '
            >
                <div
                    className='
                    flex
                    items-center
                    space-x-4
                    justify-between
                    '
                >
                    <div
                        className='
                        
                    '
                    >
                        <Avatar />
                    </div>
                    <input
                        type='text'
                        placeholder='Post something...'
                        className='
                    w-full h-12
                    px-4 pl-5
                    outline-none
                  '
                        onChange={(e) => {
                            if (e.target.value === '') {
                                setIsTyping(false);
                            } else {
                                setIsTyping(true);
                            }
                        }}
                    />

                    <div className='relative cursor-pointer'>
                        <input
                            type='file'
                            title='Upload Image'
                            className='opacity-0 absolute inset-0 '
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor='file-upload'
                            className='flex items-center justify-center w-12 h-12 rounded-full cursor-pointer border border-gray-300'
                        >
                            <PhotographIcon className='h-6 w-6 text-gray-400 cursor-pointer' />
                        </label>
                    </div>
                </div>
                {isTyping && (
                    <div
                        className='  
                            '
                    >
                        <div
                            className='
                                flex
                                items-center
                                px-2
                                '
                        >
                            <p className='font-semibold'>Guild</p>
                            <input
                                type='text'
                                placeholder='Select your Guild'
                                className='
                                        outline-none
                                        bg-blue-50
                                        flex-1
                                        p-2
                                        m-2
                                        '
                            />
                        </div>
                        <div
                            className='
                            flex
                            pr-5
                            items-center
                            '
                        >
                            <button
                                className='
                                    bg-blue-500
                                    text-white  
                                    rounded-md
                                    px-4
                                    py-2
                                    font-semibold
                                    text-sm
                                    flex-1
                                    '
                            >
                                Post
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </>
    );
}
