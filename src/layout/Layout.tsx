import React from 'react';
interface LayoutProps {
    children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <div
                className='
                h-screen 
                bg-gray-100
            '
            >
                <div
                    className='
                    container
                    h-full max-w-6xl
                    mx-auto
                    px-4
                 
                '
                >
                    <div
                        className='
                        grid grid-cols-4
                        h-full
                        bg-red-300
                        '
                    >
                        <div
                            className='
                        bg-green-300
                        '
                        >
                            jello
                        </div>
                        <div
                            className='
                            col-span-3 lg:col-span-2
                            border-x-[1px] border-gray-800
                            '
                        >
                            {children}
                        </div>
                        <div className='bg-yellow-300'>jello</div>
                    </div>
                </div>
            </div>
        </>
    );
}
