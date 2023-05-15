import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prismadb';
import useCurrentUser from '@/hooks/useCurrentUser';

export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') return res.status(405).end();
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return res.status(200).json(users);
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
}
