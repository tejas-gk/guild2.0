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
            <div
                className='
                flex
                justify-end
                p-2
            '
            >
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
            <div
                className='
                mt-5
                 px-4
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
                        font-semibold
                        text-white
                    '
                    >
                        {user?.name}
                    </p>
                    <p
                        className='
                        text-white
                        font-thin
                        '
                    >
                        @{user?.username}
                    </p>
                    <div
                        className='
                        flex
                        space-x-2
                        mt-2
                        '
                    >
                        <p>{user?.bio}</p>

                        <div
                            className='
                            flex
                            flex-row
                            text-white
                        '
                        >
                            <div>
                                <CalendarIcon className='icon' />
                                Joined {user?.createdAt}
                            </div>
                        </div>

                        <div
                            className='
                            flex
                        '
                        >
                            <p>{user?.followersIds?.length} Followers</p>
                            <p>{user?.followingIds?.length || 0} Following</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
