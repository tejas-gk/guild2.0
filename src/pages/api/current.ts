import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/lib/serverAuth';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }
    console.log('current.tsx', req)

    try {
        const session = await getSession({ req });
        if (!session?.user?.email) {
            throw new Error('Not signed in');
        }
        
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            }
        });
        console.log(currentUser);
        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}