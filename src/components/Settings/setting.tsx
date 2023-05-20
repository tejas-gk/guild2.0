import React, { useState } from 'react';
import { CogIcon } from '@heroicons/react/solid';
import { MoonIcon } from '@heroicons/react/solid';
import { SunIcon } from '@heroicons/react/solid';

function HomePage() {
    return <h1>HomePage</h1>;
}

function FirstPage() {
    return <h1>First Page</h1>;
}

function SecondPage() {
    return <h1>Second Page</h1>;
}

function ThirdPage() {
    return <h1>Third Page</h1>;
}

function Setting() {
    const [activePage, setActivePage] = useState('home');
    const [isSunIcon, setIsSunIcon] = useState(false);

    const handlePageClick = (page) => {
        setActivePage(page);
    };

    const toggleIcon = () => {
        setIsSunIcon(!isSunIcon);
    };

    return (
        <div
            className={`flex ${
                isSunIcon
                    ? 'bg-dark-body text-white'
                    : 'bg-white dark-elements-color'
            }`}
        >
            <div
                className={`h-screen w-72 ${
                    isSunIcon ? 'dark-body-color' : 'bg-white'
                }`}
            >
                <div
                    className='
                    m-6 
                    flex 
                    items-center
                    '
                >
                    <CogIcon
                        className='
                     w-6
                     h-6
                     cursor-pointer
                     '
                        stroke='
                     white
                     '
                        strokeWidth={1.5}
                    />
                    <h2
                        className={`
                     ${isSunIcon ? 'text-white' : 'dark-elements-color'}
                     
                     text-xl 
                     p-3
                     `}
                    >
                        Settings
                    </h2>
                    <div
                        className='
                        ml-20
                        '
                    >
                        <div onClick={toggleIcon}>
                            {isSunIcon ? (
                                <SunIcon
                                    className='
                        cursor-pointer
                        w-6
                        h-6 
                        text-gray-400
                        '
                                />
                            ) : (
                                <MoonIcon
                                    className='
                       cursor-pointer
                       w-6 
                       h-6 
                       text-gray-400'
                                />
                            )}
                        </div>
                    </div>
                    <div
                        className={`
                   absolute
                   inset-y-0 
                   border-l-2 
                   ${isSunIcon ? 'border-white' : 'border-black'} 
                   left-40`}
                    ></div>
                </div>
                <div
                    className={`
                  flex 
                  flex-col 
                  justify-end 
                  ${isSunIcon ? 'text-white' : 'dark-elements-color'}
                  `}
                >
                    <div
                        className={`
                border-t-2 
                ${isSunIcon ? 'border-white' : 'border-black'}`}
                    ></div>
                    <a
                        href='#HomePage'
                        onClick={() => handlePageClick('home')}
                        className={`
                        ${isSunIcon ? 'text-white' : 'dark-elements-color'}
                        m-6 
                        text-xl
                        `}
                    >
                        Home Page
                    </a>
                    <div
                        className={`
                    border-t-2 
                    ${isSunIcon ? 'border-white' : 'border-black'}`}
                    ></div>
                    <a
                        href='#FirstPage'
                        onClick={() => handlePageClick('first')}
                        className={`
                        ${isSunIcon ? 'text-white' : 'dark-elements-color'}
                        m-6 
                        text-xl
                        `}
                    >
                        First Page
                    </a>
                    <div
                        className={`
                    border-t-2 
                    ${isSunIcon ? 'border-white' : 'border-black'}`}
                    ></div>
                    <a
                        href='#SecondPage'
                        onClick={() => handlePageClick('second')}
                        className={`
                        ${isSunIcon ? 'text-white' : 'dark-elements-color'}
                        m-6 
                        text-xl
                        `}
                    >
                        Second Page
                    </a>
                    <div
                        className={`
                    border-t-2 
                    ${isSunIcon ? 'border-white' : 'border-black'}`}
                    ></div>
                    <a
                        href='#ThirdPage'
                        onClick={() => handlePageClick('third')}
                        className={`
                        ${isSunIcon ? 'text-white' : 'dark-elements-color'} 
                        m-6 
                        text-xl
                        `}
                    >
                        Third Page
                    </a>
                    <div
                        className={`
                    border-t-2 
                    ${isSunIcon ? 'border-white' : 'border-black'}`}
                    ></div>
                </div>
            </div>
            <div
                className='
               p-7 
               text-2xl 
               font-semibold 
               flex-1 
               h-screen
               '
            >
                {activePage === 'home' && <HomePage />}
                {activePage === 'first' && <FirstPage />}
                {activePage === 'second' && <SecondPage />}
                {activePage === 'third' && <ThirdPage />}
            </div>
        </div>
    );
}

export default Setting;
