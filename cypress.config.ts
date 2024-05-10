import { defineConfig } from 'cypress';
import prisma from './src/lib/prisma';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        setupNodeEvents(on, config) {
            on('task', {
                updateEmailVerified: async (email: string) => {
                    return prisma.user.update({
                        where: {
                            email,
                        },
                        data: {
                            emailVerified: new Date(),
                        },
                    });
                },
            });
        },
    },
});
