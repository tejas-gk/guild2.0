import { Server } from 'socket.io';
import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end();
    }

    const io = new Server();

    io.on('connection', async (socket) => {
        socket.on('likePost', async ({ postId }) => {
            try {
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

                updatedLikedIds.push(currentUser.id);

                // NOTIFICATION PART START
                try {
                    const post = await prisma.post.findUnique({
                        where: {
                            id: postId,
                        },
                    });

                    if (post?.userId) {
                        await prisma.notification.create({
                            data: {
                                body: 'Someone liked your tweet!',
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
                    }
                } catch (error) {
                    console.log(error);
                }
                // NOTIFICATION PART END

                const updatedPost = await prisma.post.update({
                    where: {
                        id: postId,
                    },
                    data: {
                        likedIds: updatedLikedIds,
                    },
                });

                io.emit('likePost', updatedPost);
            } catch (error) {
                console.log(error);
                return res.status(400).end();
            }
        });

        socket.on('unlikePost', async ({ postId }) => {
            try {
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

                updatedLikedIds = updatedLikedIds.filter(
                    (likedId) => likedId !== currentUser?.id
                );

                const updatedPost = await prisma.post.update({
                    where: {
                        id: postId,
                    },
                    data: {
                        likedIds: updatedLikedIds,
                    },
                });

                io.emit('unlikePost', updatedPost);
            } catch (error) {
                console.log(error);
                return res.status(400).end();
            }
        });
    });
}
