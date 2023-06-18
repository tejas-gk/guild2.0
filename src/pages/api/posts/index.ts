import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/lib/serverAuth';
import prisma from '@/lib/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
            const { body, image } = req.body;

            const post = await prisma.post.create({
                data: {
                    body,
                    image,
                    userId: currentUser.id,
                },
            });

            return res.status(200).json(post);
        }

        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req, res);
            const { postId } = req.body;

            const post = await prisma.post.findUnique({
                where: {
                    id: postId,
                },
            });

            if (!post) {
                return res.status(404).send('Post not found');
            }

            if (post.userId !== currentUser.id) {
                return res.status(401).send('Unauthorized');
            }

            await prisma.post.delete({
                where: {
                    id: postId,
                },
            });

            return res.status(200).send('Post deleted');
        }

        if (req.method === 'GET') {
            const { userId } = req.query;

            console.log({ userId });

            let posts;

            if (userId && typeof userId === 'string') {
                posts = await prisma.post.findMany({
                    where: {
                        userId,
                    },
                    include: {
                        user: true,
                        comments: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                });
            } else {
                posts = await prisma.post.findMany({
                    include: {
                        user: true,
                        comments: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                });
            }

            return res.status(200).json(posts);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send('Something went wrong');
    }
}
