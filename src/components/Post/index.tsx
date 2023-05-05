import React, { useState, useEffect, useCallback } from 'react';
import Avatar from './Avatar';
import { PhotographIcon } from '@heroicons/react/outline';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useLoginModal } from '@/hooks/useLoginModal';
import usePost from '@/hooks/usePost';
import Button from '@/components/Button';

interface PostProps {
    postId?: string;
    isComment?: boolean;
}
export default function Index({ postId, isComment = false }: PostProps): any {
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        // todo other stuff ill think later
    };

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(postId as string);

    const [isLoading, setIsLoading] = useState(false);
    const [body, setBody] = useState('');

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                setIsLoading(true);
                const url = isComment
                    ? `/api/posts/comments?postId=${postId}`
                    : '/api/posts';
                await axios.post(url, {
                    body,
                });
                toast.success(
                    `${isComment ? 'Comment' : 'Post'} created successfully`
                );
                setBody('');
                mutatePost();
                mutatePosts();
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong');
            } finally {
                setIsLoading(false);
            }
        },
        [body, mutatePost, mutatePosts, postId, isComment]
    );

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
                <form
                    className='
                    rounded-md
                    bg-white
                    shadow-md
                    border-gray-300
                    p-2
                    mx-2
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
                        <div
                            className='
                        
                    '
                        >
                            <Avatar seed={currentUser?.id} />
                        </div>
                        <input
                            type='text'
                            placeholder='Post something...'
                            name='body'
                            className='
                    w-full h-12
                    px-4 pl-5
                    outline-none
                  '
                            onChange={(e) => {
                                setBody(e.target.value);
                                if (e.target.value === '') {
                                    setIsTyping(false);
                                } else {
                                    setIsTyping(true);
                                }
                            }}
                        />

                        <div className='relative cursor-pointer'>
                            <input
                                type='file'
                                title='Upload Image'
                                className='opacity-0 absolute inset-0 '
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor='file-upload'
                                className='flex items-center justify-center w-12 h-12 rounded-full cursor-pointer border border-gray-300'
                            >
                                <PhotographIcon className='h-6 w-6 text-gray-400 cursor-pointer' />
                            </label>
                        </div>
                    </div>
                    {isTyping && (
                        <div
                            className='  
                            '
                        >
                            <div
                                className='
                                flex
                                items-center
                                px-2
                                '
                            >
                                <p className='font-semibold'>Guild</p>
                                <input
                                    type='text'
                                    placeholder='Select your Guild'
                                    className='
                                        outline-none
                                        bg-blue-50
                                        flex-1
                                        p-2
                                        m-2
                                        '
                                />
                            </div>
                            <div
                                className='
                            flex
                            pr-5
                            items-center
                            '
                            >
                                <Button title='Post' onClick={onSubmit} />
                            </div>
                        </div>
                    )}
                </form>
            )}
        </>
    );
}
