import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prismadb';
import { pusherClient, pusherServer } from '@/lib/pusher';
import useUsers from '@/hooks/useUsers';

export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { userId } = req.query;

        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID');
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        // const {data:user}=useUsers(userId as string)

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hasNotification: false,
            },
        });

        pusherServer.trigger(`notifications-${userId}`, 'read', {
            userId,
        });

        return res.status(200).json(notifications);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
