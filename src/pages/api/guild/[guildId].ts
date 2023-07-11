import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).send('Method not allowed');
    }

    try {
        const { guildId } = req.query;

        const guild = await prisma.guild.findUnique({
            where: {
                id: guildId as string,
            },
            include: {
                post: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        user: {
                            select: {
                                username: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        return res.status(200).json(guild);
    } catch (error: any) {
        console.log(error);
        return res.status(400).send(error.message);
    }
}
