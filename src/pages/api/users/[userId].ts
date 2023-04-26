import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'GET') return res.status(405).end();
    try {
        const { userId } = req.query;
        if (!userId || typeof userId !== 'string')
            return new Error('Invalid userId');
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        const followerCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId,
                },
            },
        });

        return res.status(200).json({
            ...user,
            followerCount,
        });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
}
