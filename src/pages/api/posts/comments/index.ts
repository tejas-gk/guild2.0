import React from 'react';
import serverAuth from '@/lib/serverAuth';
import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (
        req.method !== 'GET' &&
        req.method !== 'POST' &&
        req.method !== 'PATCH'
    ) {
        return res.status(405).end();
    }

    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
            const { body, postId, replyTo } = req.body;

            if (!body || typeof body !== 'string') {
                return res.status(400).json({ error: 'Invalid body' });
            }

            const comment = await prisma.comment.create({
                data: {
                    body,
                    postId,
                    replyTo,
                    userId: currentUser.id,
                },
            });

            return res.status(200).json(comment);
        } else if (req.method === 'GET') {
            const { postId } = req.query;

            if (!postId || typeof postId !== 'string') {
                return res.status(400).json({ error: 'Invalid ID' });
            }

            const comments = await prisma.comment.findMany({
                where: {
                    postId,
                },
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
            });

            return res.status(200).json(comments);
        } else if (req.method === 'PATCH') {
            const { currentUser } = await serverAuth(req, res);
            const { body, commentId } = req.body;

            if (!body || typeof body !== 'string') {
                return res.status(400).json({ error: 'Invalid body' });
            }

            const comment = await prisma.comment.findUnique({
                where: {
                    id: commentId,
                },
            });

            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }

            if (comment.userId !== currentUser.id) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            const reply = await prisma.comment.update({
                where: {
                    id: commentId,
                },
                data: {
                    body,
                },
            });

            return res.status(200).json(reply);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
