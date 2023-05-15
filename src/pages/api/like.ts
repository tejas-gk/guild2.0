import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { pusherServer } from '@/lib/pusher';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'POST') return res.status(405).end();

    const user = await serverAuth(req, res);
    if (!user) return res.status(401).end();

    const { postId, userId } = req.body;
    try {
        const like = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likedIds: {
                    push: userId,
                },
            },
        });
        await pusherServer.trigger('posts', 'like', { postId: like.id });
        return res.status(200).json(like);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
