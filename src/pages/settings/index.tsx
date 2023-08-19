import React, { useState, useEffect } from 'react';

export default function Index() {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        if (mode === 'light') {
            document.documentElement.classList.remove('dark');
            localStorage.removeItem('mode');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('mode', 'dark');
        }
    }, [mode]);

    return (
        <div
            className='dark:bg-slate-950
        dark:text-white
        bg-white
        text-black
        h-screen
        w-screen

        flex
        justify-center
        items-center

      '
        >
            <button
                onClick={() => {
                    setMode(mode === 'light' ? 'dark' : 'light');
                }}
            >
                {mode}
            </button>
        </div>
    );
}
