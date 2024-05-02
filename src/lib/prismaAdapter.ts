import prisma from '@/lib/prisma';
import type { Adapter } from '@auth/core/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';

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
