import React from 'react';

export default function Logo() {
    return (
        <div>
            <div
                className='
                relative
                h-10
                w-20
                flex-shrink-0
                cursor-pointer
                flex
                items-center
            '
            >
                <h1
                    className={`
                        rounded-lg
                        border-2 border-b-4 border-r-2 border-block  border-neutral-900
                        px-3 py-1
                        text-2xl
                        font-bold
                        transition-all
                        hover:translate-y-[-2px]
                        hover:shadow-lg
                        md:block
                    `}
                >
                    Guild
                </h1>
            </div>
        </div>
    );
}
