import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { pusherServer } from '@/lib/pusher';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { postId, vote } = req.body;

        const { currentUser } = await serverAuth(req, res);

        if (!postId || typeof postId !== 'string') {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const existingVote = await prisma.vote.findFirst({
            where: {
                postId: post.id,
                userId: currentUser.id,
            },
        });

        if (existingVote) {
            if (existingVote.vote === vote) {
                await prisma.vote.delete({
                    where: {
                        id: existingVote.id,
                    },
                });
            } else {
                await prisma.vote.update({
                    where: {
                        id: existingVote.id,
                    },
                    data: {
                        vote,
                    },
                });
            }
        }

        if (!existingVote) {
            await prisma.vote.create({
                data: {
                    vote,
                    user: {
                        connect: {
                            id: currentUser.id,
                        },
                    },
                    post: {
                        connect: {
                            id: post.id,
                        },
                    },
                },
            });
        }

        const countUpvotes = await prisma.vote.count({
            where: {
                postId: post.id,
                vote: 'UP',
            },
        });

        const countDownvotes = await prisma.vote.count({
            where: {
                postId: post.id,
                vote: 'DOWN',
            },
        });

        let countVotes = countUpvotes - countDownvotes;

        pusherServer.trigger(`post-${post.id}`, 'vote', {
            postId: post.id,
            vote,
            countVotes,
        });

        // notification
        await prisma.notification.create({
            data: {
                body: `voted on your post!`,
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

        const userWhoVoted = await prisma.user.findUnique({
            where: {
                id: currentUser.id,
            },
        });

        pusherServer.trigger(`user-${post.userId}`, 'notification', {
            user: userWhoVoted,
            body: `voted on your post!`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}
