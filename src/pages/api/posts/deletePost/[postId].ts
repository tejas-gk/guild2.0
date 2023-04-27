import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'DELETE') return res.status(405).end();
    try {
        const { postId } = req.query;
        if (!postId || typeof postId !== 'string')
            return new Error('Invalid postId');
        const post = await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        return res.status(200).json(post);
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
}
