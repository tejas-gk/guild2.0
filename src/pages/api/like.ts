import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { pusherServer } from '@/lib/pusher';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { postId } = req.body;

        const { currentUser } = await serverAuth(req, res);

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!post) {
            throw new Error('Invalid ID');
        }

        let updatedLikedIds = [...(post.likedIds || [])];

        if (req.method === 'POST') {
            updatedLikedIds.push(currentUser.id);

            try {
                if (post?.userId) {
                    const userWhoLiked = await prisma.user.findUnique({
                        where: {
                            id: currentUser.id,
                        },
                    });

                    await prisma.notification.create({
                        data: {
                            body: `${
                                userWhoLiked?.name || userWhoLiked?.username
                            } liked your tweet!`,
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
                            body: `${
                                userWhoLiked?.name || userWhoLiked?.username
                            } liked your tweet!`,
                        }
                    );
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (req.method === 'DELETE') {
            updatedLikedIds = updatedLikedIds.filter(
                (likedId) => likedId !== currentUser?.id
            );
        }

        if (req.method === 'GET') {
            const likeCount = updatedLikedIds.length;
            return res.status(200).json({ likes: likeCount });
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likedIds: updatedLikedIds,
            },
        });

        // Trigger a Pusher event to notify clients about the updated post
        pusherServer.trigger(`post-${postId}`, 'post-updated', updatedPost);

        return res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
