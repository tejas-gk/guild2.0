import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'PATCH') return res.status(405).end();
    try {
        const { currentUser } = await serverAuth(req, res);
        if (!currentUser)
            return res.status(401).json({ message: 'Not authenticated' });

        const { name, username, bio, profileImage, coverImage } = req.body;

        if (!name || !username)
            throw new Error('Name and username are required');

        const userUpdate = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage,
            },
        });

        return res.status(200).json(userUpdate);
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
}
