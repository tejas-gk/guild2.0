import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { pusherServer } from '@/lib/pusher';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res);
        const { userId } = req.body;

        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let updatedFollowers = [...(user.followingIds || [])];

        if (req.method === 'POST') {
            updatedFollowers.push(userId);

            // NOTIFICATION PART START
            try {
                await prisma.notification.create({
                    data: {
                        body: 'Someone followed you!',
                        userId,
                    },
                });

                await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        hasNotification: true,
                    },
                });
            } catch (error) {
                console.log(error);
            }
            // NOTIFICATION PART END
        }

        if (req.method === 'DELETE') {
            updatedFollowers = updatedFollowers.filter(
                (followingId) => followingId !== userId
            );
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                followingIds: updatedFollowers,
            },
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(400).end();
    }
}
