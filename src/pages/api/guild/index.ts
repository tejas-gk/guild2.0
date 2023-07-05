import serverAuth from '@/lib/serverAuth';
import { NextApiResponse, NextApiRequest } from 'next';
import prisma from '@/lib/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { currentUser } = await serverAuth(req, res);
    if (req.method === 'POST') {
        try {
            const { name } = req.body;
            const guild = await prisma.guild.create({
                data: {
                    name,
                    userId: currentUser.id,
                },
            });
            return res.status(200).json(guild);
        } catch (err) {
            console.log(err);
        }
    }

    if (req.method === 'GET') {
        try {
            const guilds = await prisma.guild.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                // where: {
                //     id:currentUser.id
                // }
            });
            return res.status(200).json(guilds);
        } catch (err) {
            console.log(err);
        }
    }
}
