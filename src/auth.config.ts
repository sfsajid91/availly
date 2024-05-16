import {
    authApiRoute,
    authRoute,
    publicRoute,
    redirectRoute,
} from '@/lib/routes';
import { UserRole } from '@prisma/client';
import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAuthRoute = authRoute.includes(nextUrl.pathname);
            const isPublicRoute = publicRoute.includes(nextUrl.pathname);
            const isAuthApiRoute = nextUrl.pathname.startsWith(authApiRoute);
            if (isPublicRoute || isAuthApiRoute) return true;

            if (isAuthRoute) {
                const callbackUrl = nextUrl.searchParams.get('callbackUrl');
                if (callbackUrl) {
                    const paramUrl = new URL(callbackUrl);
                    if (publicRoute.includes(paramUrl.pathname)) {
                        return NextResponse.redirect(paramUrl);
                    }
                }
            }

            if (!isLoggedIn && isAuthRoute) return true;

            if (isLoggedIn && isAuthRoute) {
                const callbackUrl = nextUrl.searchParams.get('callbackUrl');

                if (callbackUrl) {
                    const paramUrl = new URL(callbackUrl);

                    // prevent redirecting to different domain
                    // prevent redirecting to auth routes
                    // prevent redirecting to auth api routes
                    if (
                        paramUrl.hostname !== nextUrl.hostname ||
                        authRoute.includes(paramUrl.pathname) ||
                        paramUrl.pathname.startsWith(authApiRoute)
                    ) {
                        return NextResponse.redirect(
                            new URL(redirectRoute, nextUrl)
                        );
                    }

                    return NextResponse.redirect(paramUrl);
                }

                return NextResponse.redirect(new URL(redirectRoute, nextUrl));
            }

            if (isLoggedIn) return true;
            // remove callbackUrl from query params to prevent infinite loop
            nextUrl.searchParams.delete('callbackUrl');
            return false;
        },
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        // async redirect({ url, baseUrl }) {
        //     // Allows relative callback URLs
        //     if (url.startsWith('/')) return `${baseUrl}${url}`;

        //     // Allows callback URLs on the same origin
        //     if (new URL(url).origin === baseUrl) return url;

        //     return baseUrl;
        // },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as UserRole;
                session.user.id = token.sub as string;
            }
            return session;
        },

        // async signIn({ account, user }) {
        //     // this callback is called when the user signs in
        //     // it should return true if the user is allowed to sign in
        //     // it will be useful for ban users.

        //     return true;
        // },
    },
    providers: [
        // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
        // while this file is also used in non-Node.js environments
    ], // Add providers with an empty array for now
} satisfies NextAuthConfig;
