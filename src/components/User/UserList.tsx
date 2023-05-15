import React from 'react';
import UserBox from './UserBox';

interface UserListProps {
    users: any;
}
export default function UserList({ users }: UserListProps) {
    return (
        <>
            <div
                className='
            fixed
            inset-y-0
            pb-20 lg:pb-0
            lg:left-20 left-0
            lg:block
            overflow-y-auto
            border-r
            border-gray-200
            w-full
            m-12
        '
            >
                <div className='px-5'>
                    <div className='flex-col'>
                        <div
                            className='
                            text-2xl
                            font-bold
                            text-gray-800
                            py-4
                        '
                        >
                            Users
                        </div>
                    </div>
                    {users?.data?.map((user: any, i: number) => (
                        <div key={i}>
                            <UserBox data={user} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
