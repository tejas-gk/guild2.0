import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';
import prisma from '@/lib/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'GET' && req.method != 'POST')
        return res.status(405).end();
    try {
        if (req.method == 'POST') {
            const { currentUser } = await serverAuth(req);
            if (!currentUser) return res.status(401).end();
            const { post } = req.body;
            if (!post) return res.status(400).end();
            const newPost = await prisma.post.create({
                data: {
                    post,
                    userId: currentUser.id,
                },
            });
            return res.status(200).json(newPost);
        } else {
            const { currentUser } = await serverAuth(req);
            if (!currentUser) return res.status(401).end();
            const posts = await prisma.post.findMany({
                where: {
                    userId: currentUser.id,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return res.status(200).json(posts);
        }
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
}
