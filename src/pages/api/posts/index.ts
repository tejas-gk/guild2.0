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
            const { body, image, guildId } = req.body;

            const post = await prisma.post.create({
                data: {
                    body,
                    image,
                    guildId,
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
            const { userId, page = 1, pageSize = 10 } = req.query;

            let posts;
            let totalCount;

            // @ts-ignore
            const pageNumber = parseInt(page, 10);
            // @ts-ignore @tejas-gk
            const itemsPerPage = parseInt(pageSize, 10);

            if (userId && typeof userId === 'string') {
                // Fetch posts for a specific user with pagination
                const skip = (pageNumber - 1) * itemsPerPage;

                [posts, totalCount] = await Promise.all([
                    prisma.post.findMany({
                        where: {
                            userId,
                        },
                        include: {
                            user: {
                                select: {
                                    username: true,
                                    name: true,
                                    profileImage: true,
                                },
                            },
                            comments: true,
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                        skip, // Skip the appropriate number of items based on the page
                        take: itemsPerPage, // Limit the number of items per page
                    }),
                    prisma.post.count({
                        where: {
                            userId,
                        },
                    }),
                ]);
            } else {
                // Fetch all posts with pagination
                const skip = (pageNumber - 1) * itemsPerPage;

                [posts, totalCount] = await Promise.all([
                    prisma.post.findMany({
                        include: {
                            user: true,
                            comments: true,
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                        skip, // Skip the appropriate number of items based on the page
                        take: itemsPerPage, // Limit the number of items per page
                    }),
                    prisma.post.count(),
                ]);
            }

            return res.status(200).json({ posts, totalCount });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send('Something went wrong');
    }
}
