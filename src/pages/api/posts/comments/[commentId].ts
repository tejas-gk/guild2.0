import { NextApiRequest, NextApiResponse } from 'next';
import React from 'react';
import prisma from '@/lib/prismadb';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const { commentId } = req.query;
}
