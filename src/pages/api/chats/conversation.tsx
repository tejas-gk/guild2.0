import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { pusherServer } from '@/lib/pusher';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function POST(request: Request) {
    try {
        const currentUser = await getServerSession(authOptions);
        const body = await request.json();
        const { userId, isGroup, members, name } = body;

        if (!currentUser?.user?.id || !currentUser?.user?.email) {
            return new NextResponse('Unauthorized', { status: 400 });
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value,
                            })),
                            {
                                id: currentUser.id,
                            },
                        ],
                    },
                },
                include: {
                    users: true,
                },
            });

            // Update all connections with new conversation
            newConversation.users.forEach((user) => {
                if (user.email) {
                    pusherServer.trigger(
                        user.email,
                        'conversation:new',
                        newConversation
                    );
                }
            });

            return NextResponse.json(newConversation);
        }

        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.user.id, userId],
                        },
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.user.id],
                        },
                    },
                ],
            },
        });

        const singleConversation = existingConversations[0];

        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.user.id,
                        },
                        {
                            id: userId,
                        },
                    ],
                },
            },
            include: {
                users: true,
            },
        });

        // Update all connections with new conversation
        newConversation.users.map((user) => {
            if (user.email) {
                pusherServer.trigger(
                    user.email,
                    'conversation:new',
                    newConversation
                );
            }
        });

        return NextResponse.json(newConversation);
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
