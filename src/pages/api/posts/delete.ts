import prisma from '@/lib/prismadb';

export async function deletePost(id: string) {
    const post = await prisma.post.delete({
        where: { id },
    });
    return post;
}
