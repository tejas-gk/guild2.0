import Avatar from '@/components/Post/Avatar';
import useCurrentUser from '@/hooks/useCurrentUser';
import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Index() {
    const [notifications, setNotifications] = useState([]);
    const { data: currentUser } = useCurrentUser();

    useEffect(() => {
        const fetchNotifications = async () => {
            const res = await fetch(
                `/api/notificatons/${currentUser?.id ?? ''}`
            );
            const data = await res.json();
            setNotifications(data);
            console.log('notify', data);
        };
        fetchNotifications();
    }, [currentUser?.id]);

    if (!notifications) {
        return (
            <div>
                <h1 className='text-3xl font-bold underline text-center'>
                    Notifications
                </h1>
                <p>No notifications</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Notifications</h1>
            {notifications.map((notification, i) => (
                <div
                    key={i}
                    className='
                    bg-white
                    mx-0
                    border-b-[1px]
                    border-neutral-800
                    p-4
                    flex
                    items-center
                    gap-4
                    cursor-pointer
                    transition
                    hover:bg-neutral-100
                    hover:shadow-md
                  '
                >
                    <Avatar seed={notification?.userId} />
                    <p
                        className='
                    text-lg
                    font-semibold
                    text-neutral-900
                    mr-2
                  '
                    >
                        {notification?.body}
                    </p>
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}
