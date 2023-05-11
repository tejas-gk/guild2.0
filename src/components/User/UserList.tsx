import React from 'react';

interface UserListProps {
    users: any;
}
export default function UserList({ users }: UserListProps) {
    console.log(users);
    return <div>user</div>;
}
