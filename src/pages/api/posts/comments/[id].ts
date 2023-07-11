import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';
import prisma from '@/lib/prismadb';
import { pusherServer } from '@/lib/pusher';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        const { currentUser } = await serverAuth(req, res);
        const { commentId } = req.query;

        if (!commentId || typeof commentId !== 'string') {
            throw new Error('Invalid ID');
        }

        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
            },
            select: {
                userId: true,
                postId: true,
            },
        });

        if (!comment) {
            return res.status(404).end();
        }

        if (comment.userId !== currentUser.id) {
            return res.status(401).end();
        }

        await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });

        // Trigger a Pusher event to notify clients about the deleted comment
        pusherServer.trigger(
            `post-${comment.postId}`,
            'comment-deleted',
            commentId
        );

        return res.status(200).end();
    }
}
