import { NextApiResponse, NextApiRequest } from 'next';
import serverAuth from '@/lib/serverAuth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return res.status(200).json({ name: 'John Doe' });
}
