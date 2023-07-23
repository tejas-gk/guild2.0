import Avatar from '@/components/Avatar';
import useCurrentUser from '@/hooks/useCurrentUser';
import useUsers from '@/hooks/useUsers';
import { pusherClient } from '@/lib/pusher';
import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Index() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const { data: currentUser } = useCurrentUser();

    useEffect(() => {
        const channel = pusherClient.subscribe(`user-${currentUser?.id}`);
        channel.bind('notification', (data: any) => {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                data,
            ]);
        });

        return () => {
            pusherClient.unsubscribe(`user-${currentUser?.id}`);
        };
    }, [currentUser?.id]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const res = await fetch(
                `/api/notificatons/${currentUser?.id ?? ''}`
            );
            const data = await res.json();
            setNotifications(data);
        };
        fetchNotifications();
    }, [currentUser?.id]);

    const { data: user } = useUsers(notifications[0]?.userId);
    console.log(user, 'user');

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
        <div
            className='
            h-screen 
            bg-white
        '
        >
            <h1
                className='
        text-3xl
        font-bold
        text-gray-900/70
        px-4 py-2
            '
            >
                Notifications
            </h1>
            {notifications.map((notification, i) => (
                <div
                    key={i}
                    className='
            bg-white
            mx-0
            p-4
            flex
            items-center
            gap-4
            cursor-pointer
            transition
            hover:bg-neutral-100
            hover:shadow-md
            w-1/2
          '
                >
                    <Avatar seed={notification?.userId} size='medium' />
                    <p
                        className='
              text-lg
              font-semibold
              text-neutral-900
              mr-2
              flex
            '
                    >
                        <Link href={`/users/${user.id}`} className='mr-3'>
                            {user.name}{' '}
                        </Link>
                        <span>
                            {notification?.body
                                .split(' ')
                                .map((word: any, index: number) => (
                                    <span
                                        className='
                                    word
                                '
                                        key={index}
                                    >
                                        {word}
                                    </span>
                                ))}
                        </span>
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
