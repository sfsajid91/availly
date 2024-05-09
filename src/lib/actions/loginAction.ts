'use server';

import { signIn, signOut } from '@/auth';
import type { LoginSchemaType } from '@/lib/schema/login-schema';

import { AuthError } from 'next-auth';

export const loginAction = async (data: LoginSchemaType) => {
    const generateErrorResponse = (error: string, all: boolean = true) => {
        const errors = [
            {
                field: 'email',
                message: error,
            },
        ];
        if (all) {
            errors.push({
                field: 'password',
                message: error,
            });
        }
        return {
            errors,
        };
    };

    try {
        await signIn('credentials', data);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    if (error.name === 'UnverifiedEmailError') {
                        return generateErrorResponse(
                            'Email not verified.',
                            false
                        );
                    }
                    return generateErrorResponse('Invalid credentials.');

                case 'AccessDenied':
                    return generateErrorResponse('You are not authorized.');

                default:
                    return generateErrorResponse('Something went wrong.');
            }
        }
        throw error;
    }
};

export const googleLoginAction = async () => {
    await signIn('google');
};

export const logoutAction = async () => {
    await signOut();
};
