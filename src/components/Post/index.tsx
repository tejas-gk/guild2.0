import React, { useState, useEffect, useCallback } from 'react';
import Avatar from '../Avatar';
import {
    ChevronDownIcon,
    HomeIcon,
    PhotographIcon,
    XIcon,
} from '@heroicons/react/outline';
import { useRegisterModal } from '@/hooks/useModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import axios from 'axios';
import { useLoginModal } from '@/hooks/useModal';
import Button from '@/components/Button';
import ImageUpload from '../Input/ImageUpload';
import Image from 'next/image';
import { useToast } from '@/hooks/useToast';
import { AiOutlineCamera } from 'react-icons/ai';
import { BsCamera } from 'react-icons/bs';
import Dropdown from '../Dropdown';
import useGuild from '@/hooks/useGuild';
import Link from 'next/link';

interface PostProps {
    postId?: string;
    isComment?: boolean;
}
export default function Index({ postId, isComment = false }: PostProps): any {
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const toast = useToast();

    const { data: currentUser, isLoading: currentUserIsLoading } =
        useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePosts(postId as string);
    const { data: guildData } = useGuild();

    const [isLoading, setIsLoading] = useState(false);
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [activeGuild, setActiveGuild] = useState('' as string);
    const [activeGuildName, setActiveGuildName] = useState('' as string);

    const MAX_HEIGHT = 200;

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                const guildId = activeGuild || null;
                setIsLoading(true);
                const url = isComment
                    ? `/api/posts/comments?postId=${postId}&parentId=${null}`
                    : '/api/posts';
                await axios.post(url, {
                    body,
                    image,
                    guildId: guildId,
                });
                toast.success(
                    `${isComment ? 'Comment' : 'Post'} created successfully`
                );
                mutatePost();
                mutatePosts();
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong');
            } finally {
                setIsLoading(false);
                setIsTyping(false);
                setImage('');
                setBody('');
            }
        },
        [
            body,
            mutatePost,
            mutatePosts,
            postId,
            isComment,
            image,
            toast,
            activeGuild,
        ]
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event?.target?.result;
                setImage(base64 as unknown as string);
            };
            reader.readAsDataURL(file);
        }

        setIsTyping(true);
    };

    const handlePostInputChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setBody(e.target.value);
        setIsTyping(Boolean(e.target.value));

        const scrollHeight = e.target.scrollHeight;
        e.target.style.height = `${Math.min(scrollHeight, MAX_HEIGHT)}px`;
    };

    if (currentUserIsLoading) return <div>Loading ...</div>;

    return (
        <>
            {!currentUser ? (
                <div
                    className='
                        flex
                        items-center
                        justify-center
                        h-12
                        bg-white
                        rounded-md
                        shadow-md
                        border-gray-300
                        mx-2
                        '
                >
                    <p className='font-semibold text-gray-500'>
                        Please{' '}
                        <span
                            className='
                                text-blue-500   
                                cursor-pointer
                                '
                            onClick={() => {
                                loginModal.onOpen();
                            }}
                        >
                            Login
                        </span>{' '}
                        or{' '}
                        <span
                            className='
                                text-blue-500
                                cursor-pointer
                                '
                            onClick={() => {
                                registerModal.onOpen();
                            }}
                        >
                            Register
                        </span>{' '}
                        to post
                    </p>
                </div>
            ) : (
                <div>
                    {image && (
                        <div
                            className='
                            flex
                             justify-center
                             relative
                             '
                        >
                            <div
                                className='
                                absolute
                                 top-0 right-0
                                 '
                            >
                                <button
                                    title='Remove image'
                                    className='
                                        bg-white
                                         rounded-full 
                                         p-1
                                          shadow-md
                                          '
                                    onClick={() => setImage('')}
                                >
                                    <XIcon
                                        className='h-6 w-6
                                         text-gray-400
                                          cursor-pointer
                                          '
                                    />
                                </button>
                            </div>

                            <Image
                                src={image}
                                alt='post'
                                height={200}
                                width={400}
                                className='w-full h-full
                                
                                    '
                            />
                        </div>
                    )}

                    <form
                        className='
                        rounded-md
                        bg-white
                        shadow-md
                        border-gray-300
                        px-4 py-2
                        mx-4
                            '
                        onSubmit={onSubmit}
                    >
                        <div
                            className='
                        flex
                        
                        space-x-4
                        justify-between
                          '
                        >
                            <div
                                className='
                                flex-shrink-0
                            '
                            >
                                <Avatar seed={currentUser?.id} size='medium' />
                            </div>
                            <div
                                className='
                            flex-grow
                              '
                            >
                                <textarea
                                    placeholder='Post something...'
                                    name='body'
                                    className='w-full h-12
                                     px-4 pl-5
                                      outline-none
                                        resize-none
                                        rounded-md
                                        border-gray-300
                                        scrollbar-hide
                                      '
                                    onChange={handlePostInputChange}
                                    onInput={handlePostInputChange}
                                />
                            </div>

                            <div
                                className='
                            flex
                            items-center
                            relative'
                            >
                                <label
                                    htmlFor='file-upload'
                                    className="flex'
                                       items-center
                                       justify-center
                                       w-12 h-12 
                                       rounded-full
                                       cursor-pointer
                                       border
                                       relative
                                      border-gray-300"
                                >
                                    <BsCamera
                                        className='h-7 w-7
                                     text-gray-400
                                      cursor-pointer
                                        m-2
                                      '
                                    />
                                </label>
                                <input
                                    type='file'
                                    title='Upload Image'
                                    className='opacity-0 
                                    absolute
                                    inset-0'
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        {isTyping && (
                            <div>
                                <div
                                    className='flex 
                                items-center
                                w-[calc(100%-4rem)]
                                bg-gray-100
                                 px-2'
                                >
                                    <p className='font-semibold flex-1'>
                                        Guild
                                    </p>
                                    <p>{activeGuildName}</p>
                                    <div>
                                        <ChevronDownIcon
                                            className='
                                                    h-6 w-6
                                                    cursor-pointer
                                                '
                                            onClick={() => setIsOpen(!isOpen)}
                                        />
                                        {isOpen && (
                                            <div>
                                                <Dropdown
                                                    setIsOpen={setIsOpen}
                                                    className='
                                                        z-50
                                                    '
                                                >
                                                    <ul>
                                                        {guildData?.map(
                                                            (guild: any) => (
                                                                <li
                                                                    key={
                                                                        guild.id
                                                                    }
                                                                    onClick={() => {
                                                                        setActiveGuild(
                                                                            guild.id
                                                                        ) as any;
                                                                        setActiveGuildName(
                                                                            guild.name
                                                                        ) as any;
                                                                    }}
                                                                >
                                                                    <div
                                                                        className='
                                                                                    flex
                                                                                    items-center
                                                                                    space-x-2
                                                                                    px-4 py-2
                                                                                    hover:bg-gray-200
                                                                                    rounded-md
                                                                                    transition
                                                                                    duration-200
                                                                                    ease-in-out
                                                                                    cursor-pointer
                                                                                    '
                                                                    >
                                                                        <Avatar
                                                                            seed={
                                                                                guild.iconUrl
                                                                            }
                                                                            size='medium'
                                                                        />
                                                                        <p>
                                                                            {
                                                                                guild.name
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </Dropdown>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className='flex 
                                justify-end
                                 pr-5
                                 items-center'
                                >
                                    <Button title='Post' onClick={onSubmit}>
                                        Post
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            )}
        </>
    );
}
