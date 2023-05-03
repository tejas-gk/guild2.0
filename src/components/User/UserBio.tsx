import React from 'react';
import useUsers from '@/hooks/useUsers';
import useCurrentUser from '@/hooks/useCurrentUser';
import Button from '@/components/Button';
import { CalendarIcon } from '@heroicons/react/outline';
import { useEditModal } from '@/hooks/useEditModal';

export default function UserBio() {
    const { data: currentUser } = useCurrentUser();
    const { data: user } = useUsers(currentUser?.id as string);

    const editModal = useEditModal();

    return (
        <div className=''>
            <div className='flex justify-end p-4 '>
                {currentUser?.id === user?.id ? (
                    <div>
                        <Button
                            title='Edit Profile'
                            colors='secondary'
                            onClick={() => editModal.onOpen()}
                        />
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
            <div className='mt-1 px-4'>
                <div className='flex flex-col'>
                    <p className='text-2xl font-semibold text-black'>
                        {user?.name}
                    </p>
                    <p className='text-black font-thin'>@{user?.username}</p>
                    <div className='flex space-x-2 mt-2'>
                        <p>{user?.bio}</p>
                        <div className='flex flex-col items-center text-black-500 text-sm pt-2 font-bold'>
                            <div className='flex flex-row items-center space-x-1'>
                                <CalendarIcon className='w-4 h-4' />
                                <span>Joined {user?.createdAt}</span>
                            </div>
                            <div className='flex flex-row items-center space-x-4 mt-2'>
                                <span>{user?.followersIds?.length}</span>
                                <span>Followers</span>
                                <span>
                                    {user?.followingIds?.length || 0} Following
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
