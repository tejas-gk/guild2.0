import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';
import prisma from '@/lib/prismadb';
import { pusherServer } from '@/lib/pusher';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
            const { body, parentId } = req.body;
            const { postId } = req.query;

            if (!postId || typeof postId !== 'string') {
                throw new Error('Invalid ID');
            }

            const comment = await prisma.comment.create({
                data: {
                    body,
                    userId: currentUser.id,
                    postId,
                    parentId,
                },
            });

            try {
                const post = await prisma.post.findUnique({
                    where: {
                        id: postId,
                    },
                });

                if (post?.userId) {
                    const userWhoReplied = await prisma.user.findUnique({
                        where: {
                            id: post.userId,
                        },
                    });

                    if (userWhoReplied) {
                        await prisma.notification.create({
                            data: {
                                body: `${userWhoReplied.name} replied to your tweet!`,
                                userId: post.userId,
                            },
                        });

                        await prisma.user.update({
                            where: {
                                id: post.userId,
                            },
                            data: {
                                hasNotification: true,
                            },
                        });

                        pusherServer.trigger(
                            `user-${post.userId}`,
                            'notification',
                            {
                                body: `${userWhoReplied.name} replied to your tweet!`,
                            }
                        );
                    }
                }
            } catch (error) {
                console.log(error);
            }

            // Trigger a Pusher event to notify clients about the new comment
            pusherServer.trigger(`post-${postId}`, 'comment-created', comment);

            return res.status(200).json(comment);
        } else if (req.method === 'GET') {
            const { postId } = req.query;

            const comments = await prisma.comment.findMany({
                where: {
                    postId: postId as string,
                },
            });

            return res.status(200).json(comments);
        } else {
            return res.status(405).end();
        }
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}
