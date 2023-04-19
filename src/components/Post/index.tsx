import React from 'react';
import Avatar from './Avatar';

export default function index() {
    return (
        <>
            <form
                className='
                    flex
                    items-center
                    space-x-4
                    '
            >
                <Avatar />
                <input
                    type='text'
                    placeholder='Post something...'
                    className='
                    w-full h-12
                    border-2 border-gray-300
                    px-4 pl-5
                    outline-none
                  '
                />
            </form>
        </>
    );
}
