import serverAuth from '@/lib/serverAuth';
import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res);
        let { body, postId, replyTo } = req.body;

        if (!body || typeof body !== 'string') {
            return res.status(400).json({ error: 'Invalid body' });
        }

        const parentComment = await prisma.comment.findUnique({
            where: {
                id: postId, // Assuming postId is the ID of the parent comment
            },
        });

        if (!parentComment) {
            // Handle the case where the parent comment doesn't exist
            // You can throw an error or return an appropriate response
        } else {
            const comment = await prisma.comment.update({
                where: {
                    id: postId, // Assuming postId is the ID of the parent comment
                },
                data: {
                    replies: {
                        create: [
                            {
                                body,
                                postId,
                                replyTo,
                                userId: currentUser.id,
                            },
                        ],
                    },
                },
                include: {
                    replies: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: 'asc',
                        },
                    },
                    user: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                },
            });
        }

        return res.status(200).json('comment');
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
