import useConversation from '@/hooks/useConversation';
import React from 'react';

export default function Index() {
    return (
        <div
            className='
        hidden lg:block
        lg:pl-80
        h-full
      '
        >
            <div
                className='
            px-4 py-10 sm:px-6 lg:px-8
            h-screen
            flex
            justify-center
            items-center
            bg-gray-100
            '
            >
                <div
                    className='
                flex
                flex-col
                items-center
                justify-center
                text-center
              '
                >
                    Start a conversation
                </div>
            </div>
        </div>
    );
}
