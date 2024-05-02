import { authConfig } from '@/auth.config';
import prisma from '@/lib/prisma';
import { prismaAdapter } from '@/lib/prismaAdapter';
import { loginUserService } from '@/services/user.service';
import CredentialsProvider from '@auth/core/providers/credentials';
import NextAuth, { CredentialsSignin } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';

class UnverifiedEmailError extends CredentialsSignin {
    code = 'Verify your email address before signing in.';
}

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

        // @ts-expect-error - some typescript error that doesn't matter
        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials) {
                try {
                    const user = await loginUserService(credentials);
                    return user;
                } catch (err) {
                    //for email verification
                    if (
                        err instanceof Error &&
                        err.message === 'Email not verified'
                    ) {
                        throw new UnverifiedEmailError();
                    }
                    throw err;
                }
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

    adapter: prismaAdapter as Adapter,
});
