import prisma from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return res.status(200).json({
        message: 'Hello World',
        isBookmarked: true,
    });
}
