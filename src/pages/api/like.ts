import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { pusherServer } from '@/lib/pusher';
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { postId } = req.body;

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

        let updatedLikedIds = [...(post.likedIds || [])];

        const userHasLiked = updatedLikedIds.includes(currentUser.id);

        if (req.method === 'POST') {
            if (userHasLiked) {
                // User has already liked the post, remove the like
                updatedLikedIds = updatedLikedIds.filter(
                    (id) => id !== currentUser.id
                );
            } else {
                // User hasn't liked the post, add the like
                updatedLikedIds.push(currentUser.id);

                try {
                    if (post.userId) {
                        const userWhoLiked = await prisma.user.findUnique({
                            where: {
                                id: currentUser.id,
                            },
                        });

                        await prisma.notification.create({
                            data: {
                                body: `liked your post!`,
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
                                user: userWhoLiked,
                                body: `liked your post!`,
                            }
                        );
                    }
                } catch (error) {
                    console.error(error);
                    return res
                        .status(500)
                        .json({ error: 'Failed to process the like' });
                }
            }
        }
        // else if (req.method === 'DELETE') {
        //     // Find the bookmark associated with the post and the current user
        //     const bookmark = await prisma.bookmark.findFirst({
        //         where: {
        //             postId,
        //             userId: currentUser.id,
        //         },
        //     });

        //     if (bookmark) {
        //         // Delete the bookmark from Prisma
        //         await prisma.bookmark.delete({
        //             where: {
        //                 id: bookmark.id,
        //             },
        //         });

        //         // ... (Additional logic for notifications or other actions)

        //         return res.status(200).json({ message: 'Bookmark deleted successfully' });
        //     } else {
        //         return res.status(404).json({ error: 'Bookmark not found' });
        //     }
        // }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likedIds: updatedLikedIds,
            },
        });

        pusherServer.trigger(`post-${postId}`, 'post-updated', updatedPost);

        return res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}
