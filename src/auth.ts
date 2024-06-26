import { authConfig } from '@/auth.config';
import prisma from '@/lib/prisma';
import { prismaAdapter } from '@/lib/prismaAdapter';
import { loginUserService } from '@/services/user.service';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),

        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials) {
                const user = await loginUserService(credentials);
                return user;
            },
        }),
    ],

    session: {
        strategy: 'jwt',
        maxAge: 3 * 24 * 60 * 60, // 3 days
    },

    events: {
        async linkAccount({ user, account, profile }) {
            if (account.provider === 'google') {
                const data = { emailVerified: new Date() } as {
                    emailVerified: Date;
                    avatar?: string;
                };
                if (!user.image && profile.image) {
                    data.avatar = profile.image;
                }
                await prisma.user.update({
                    where: { id: user.id },
                    data,
                });
            }
        },
    },

    adapter: prismaAdapter,
});
