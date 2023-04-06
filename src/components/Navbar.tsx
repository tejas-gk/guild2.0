import React from 'react'
import Image from 'next/image'
import {
    BeakerIcon,
    HomeIcon,
    SearchIcon,
    BellIcon,
    ChatIcon,
    PlusIcon,
    SpeakerphoneIcon,
    VideoCameraIcon,
    SparklesIcon,
    GlobeIcon,
    ArrowCircleDownIcon,
} from '@heroicons/react/outline'
import {
    ChevronDownIcon,
    MenuIcon,
} from '@heroicons/react/solid'
export default function Navbar() {
    return (
        <div className='
            flex
            items-center
            bg-white
            px-4 py-2
            shadow-md
            sticky top-0
            z-50
        '>
            <div className='
                relative
                h-10
                w-20
                flex-shrink-0
                cursor-pointer
                flex
                items-center
            '>
                Guild
            </div>

            <div className='
                flex
                flex-1
                items-center
                flex-row
                mx-7
            '>
                <HomeIcon
                    className='
                        h-6 w-6
                        cursor-pointer
                    '
                />
                <p className='
                    hidden md:inline-flex
                    ml-2
                    flex-1
                '>Home</p>
                <ChevronDownIcon
                    className='
                        h-6 w-6
                        cursor-pointer
                    '
                />
            </div>

            <form className='
            flex 
            flex-1
            items-center
            space-x-2
            rounded-sm
            px-3 py-1
            border border-gray-200
            bg-gray-100
            '>
                <SearchIcon
                    className='
                        h-6 w-6
                        cursor-pointer
                        text-gray-500
                    '
                />
                <input
                    type='text'
                    placeholder='Search'
                    className='
                        outline-none
                        flex-1
                        bg-transparent
                    '
                />
                
            </form>

            <div className='
                mx-5
                items-center
                hidden lg:inline-flex
                space-x-2
            '>
                <SparklesIcon className='icon'/>
                <GlobeIcon className='icon'/>
                <PlusIcon className='icon'/>
                <SpeakerphoneIcon className='icon'/>
                <VideoCameraIcon className='icon'/>
                <ChatIcon className='icon'/>
                <BellIcon className='icon'/>  
            </div>

            <div className='
                flex lg:hidden
                items-center
                '
            >
                <MenuIcon className='icon' />
            </div>
            
            <div className='
                hidden lg:flex
                items-center
                space-x-2
                justify-end
                border border-gray-200
                p-2
            '>
                <ArrowCircleDownIcon
                    // src='https://links.papareact.com/231'
                    // width={40}
                    // height={40}
                    // layout='fixed'
                    // alt='Profile Picture'
                    className='
                        rounded-full
                        cursor-pointer
                        transition
                        duration-150
                        transform
                        hover:scale-110
                        h-6 w-6
                    '
                />
                <p className='
                    text-gray-500
                    font-semibold
                '>Sign in</p>
            </div>
        </div>
    )
}
