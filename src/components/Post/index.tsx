import React, { useState, useEffect, useCallback } from 'react';
import Avatar from './Avatar';
import { PhotographIcon, XIcon } from '@heroicons/react/outline';
import { useRegisterModal } from '@/hooks/useModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import axios from 'axios';
import { useLoginModal } from '@/hooks/useModal';
import usePost from '@/hooks/usePost';
import Button from '@/components/Button';
import ImageUpload from '../Input/ImageUpload';
import Image from 'next/image';
import { useToast } from '@/hooks/useToast';

interface PostProps {
    postId?: string;
    isComment?: boolean;
}
export default function Index({ postId, isComment = false }: PostProps): any {
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const toast = useToast();

    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(postId as string);

    const [isLoading, setIsLoading] = useState(false);
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                const url = isComment
                    ? `/api/posts/comments?postId=${postId}&parentId=${postId}`
                    : '/api/posts';
                await axios.post(url, {
                    body,
                    image,
                });
                toast.success(
                    `${isComment ? 'Comment' : 'Post'} created successfully`
                );
                setImage('');
                setBody('');
                mutatePost();
                mutatePosts();
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong');
            } finally {
                setIsLoading(false);
                setIsTyping(false);
            }
        },
        [body, mutatePost, mutatePosts, postId, isComment, image]
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
                            p-2
                            '
                        onSubmit={onSubmit}
                    >
                        <div
                            className='
                        flex
                         items-center
                          space-x-4
                          justify-between
                          '
                        >
                            <div>
                                <Avatar seed={currentUser?.id} />
                            </div>
                            <div
                                className='
                            flex
                             flex-col
                              w-full
                              '
                            >
                                <input
                                    type='text'
                                    placeholder='Post something...'
                                    name='body'
                                    className='w-full h-12
                                     px-4 pl-5
                                      outline-none
                                      '
                                    onChange={(e) => {
                                        setBody(e.target.value);
                                        setIsTyping(Boolean(e.target.value));
                                    }}
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
                                      border-gray-300"
                                >
                                    <PhotographIcon
                                        className='h-10 w-10
                                     text-gray-400
                                      cursor-pointer
                                      m-1
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
                                 px-2'
                                >
                                    <p className='font-semibold'>Guild</p>
                                    <input
                                        type='text'
                                        placeholder='Select your Guild'
                                        className='outline-none
                                         bg-blue-50 
                                         flex-1
                                          p-2
                                           m-2'
                                    />
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
