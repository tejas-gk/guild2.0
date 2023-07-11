import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { pusherServer } from '@/lib/pusher';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest } from 'next';

export async function POST(req: NextApiRequest, res: NextResponse) {}
