import React from 'react';
import useUsers from '@/hooks/useUsers';
import useCurrentUser from '@/hooks/useCurrentUser';
import Button from '@/components/Button';
import { CalendarIcon } from '@heroicons/react/outline';
// import { useEditModal } from '@/hooks/useEditModal';
import { useRouter } from 'next/router';
import { useEditModal } from '@/hooks/useModal';
import useFollow from '@/hooks/useFollow';
import useGuild from '@/hooks/useGuild';
export default function UserBio() {
    const { data: currentUser } = useCurrentUser();
    const router = useRouter();
    const { data: guild } = useGuild(router.query?.guildId as string);
    const editModal = useEditModal();
    const { isFollowing, toggleFollow } = useFollow(guild?.id as string);
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
                {currentUser?.id === router.query?.guildId ? (
                    <div>
                        <Button
                            title='Edit Profile'
                            colors='secondary'
                            onClick={editModal.onOpen}
                        >
                            Edit Profile
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button
                            colors='secondary'
                            onClick={toggleFollow}
                            title={isFollowing ? 'Leave' : 'Join'}
                        >
                            {isFollowing ? 'Leave' : 'Join'}
                        </Button>
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
                        {guild?.name}
                    </p>
                    <p
                        className='
                        mt-2
                    '
                    >
                        {guild?.bio}
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
                                    Created at{' '}
                                    {new Date(
                                        guild?.createdAt
                                    ).toLocaleDateString()}
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
                                    Members{' '}
                                    <span className='font-bold'>
                                        {guild?.following?.length || 0}
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
