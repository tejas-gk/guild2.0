import React, { useState } from 'react';
// import TextareaAutoSize from 'react-textarea-autosize'

export default function Index() {
    const [text, setText] = useState('');
    const handleChange = (event: any) => {
        setText(event.target.value);
    };

    return (
        <div>
            <div
                className='flex
            flex-row
            items-center
            gap-4
            p-4
          '
            >
                <h1
                    className='
                text-4xl
                font-bold
                text-gray-800
              '
                >
                    Create Post
                </h1>
                <div
                    className='
                text-md
                font-medium
                text-gray-500
              '
                >
                    in /r/nextjs
                </div>
            </div>
            {/* editor */}
            <div
                className='
          w-full
          p-4
          bg-zinc-50
            rounded-md
            border border-zinc-200
          '
            >
                <form className='w-fit'>
                    <div
                        className='
                    
                  '
                    >
                        <textarea
                            onChange={handleChange}
                            placeholder='Create Post'
                            className='
                            w-full
                            resize-none
                            bg-transparent
                            outline-none
                            border-none
                            appearance-none
                            text-4xl
                            overflow-hidden
                            font-bold
                            focus:outline-none
                          '
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
