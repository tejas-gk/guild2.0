import prisma from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const currentUser = await getServerSession(authOptions);

    // const { currentUser } = await serverAuth(req, res)

    try {
        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    email: currentUser?.user?.email,
                },
            },
        });
        return users;
    } catch (err) {
        return [];
    }
}
