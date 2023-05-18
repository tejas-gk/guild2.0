import React from 'react';
import useUsers from '@/hooks/useUsers';
import useCurrentUser from '@/hooks/useCurrentUser';
import Button from '@/components/Button';
import { CalendarIcon } from '@heroicons/react/outline';
import { useEditModal } from '@/hooks/useEditModal';
import { useRouter } from 'next/router';
export default function UserBio() {
    const { data: currentUser } = useCurrentUser();
    const router = useRouter();
    const { data: user } = useUsers(router.query?.id as string);

    const editModal = useEditModal();
    return (
        <div className=''>
            <div
                className='
            flex 
            justify-end
             p-4
             mt-10
             relative
             '
            >
                {currentUser?.id === user?.id ? (
                    <div>
                        <Button
                            title='Edit Profile'
                            colors='secondary'
                            onClick={() => editModal.onOpen()}
                        />
                        <p>{currentUser?.id}</p>
                    </div>
                ) : (
                    <div>
                        <Button
                            title='Follow'
                            colors='secondary'
                            onClick={() => {}}
                        />
                    </div>
                )}
            </div>
            <div
                className='
            px-4
            -mt-7
            '
            >
                <div
                    className='
                flex
                flex-col
                '
                >
                    <p
                        className='
                    text-2xl
                    font-bold
                     text-black
                     '
                    >
                        {user?.name}
                    </p>
                    <p
                        className='
                    text-gray-700
                     font-thin
                     '
                    >
                        @{user?.username}
                    </p>
                    <p
                        className='
                        mt-2
                    '
                    >
                        {user?.bio}
                    </p>
                    <div
                        className='
                    flex
                     space-x-2
                     mt-2
                     '
                    >
                        <div
                            className='
                        flex
                        flex-col
                         text-sm
                          pt-2
                          '
                        >
                            <div
                                className='
                            flex
                            flex-row
                             items-center
                              space-x-1
                              '
                            >
                                <CalendarIcon
                                    className='
                                w-4 h-4
                                '
                                />
                                <p>
                                    Joined{' '}
                                    {new Date(
                                        user?.createdAt
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    {user?.location && (
                                        <>
                                            <span className='font-bold'>•</span>
                                            <span>{user?.location}</span>
                                        </>
                                    )}
                                </p>
                            </div>
                            <div
                                className='
                            flex
                             flex-row
                              items-center
                               space-x-4
                               mt-2
                               '
                            >
                                <p
                                    className='
                                
                                '
                                >
                                    Following{' '}
                                    <span className='font-bold'>
                                        {user?.following?.length || 0}
                                    </span>
                                </p>
                                <p
                                    className='
                                '
                                >
                                    Followers{' '}
                                    <span className='font-bold'>
                                        {user?.followers?.length || 0}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <span
                    className='
                    w-full
                    h-0.5
                    bg-gray-200
                    block
                    mt-4
                    '
                ></span>
            </div>
        </div>
    );
}
