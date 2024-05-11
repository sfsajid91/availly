import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { Adapter } from 'next-auth/adapters';

export const prismaAdapter: Adapter = {
    ...PrismaAdapter(prisma),
    createUser: (user) => {
        const { email, name, image } = user;

        return prisma.user.create({
            data: {
                email,
                avatar: image,
                name: name as string,
            },
        });
    },
};
