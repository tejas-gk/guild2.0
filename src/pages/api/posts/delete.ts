import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'DELETE') return res.status(405).end();
    try {
        const { postId } = req.query;
        if (!postId || typeof postId !== 'string')
            return new Error('Invalid postId');
        const { currentUser } = await serverAuth(req, res);
        if (!currentUser)
            return res.status(401).json({ message: 'Not authenticated' });
        const post = await prisma.post.delete({
            where: {
                id: currentUser.id,
            },
        });

        if (!post) return res.status(404).json({ message: 'Post not found' });

        return res.status(200).json(post);
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
}
