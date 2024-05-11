'use server';

import { getUserByEmail } from '@/lib/data/user';
import prisma from '@/lib/prisma';
import {
    EmailSchema,
    PasswordSchema,
    PasswordSchemaType,
    type EmailSchemaType,
} from '@/lib/schema/reset-password';
import { sendPasswordResetEmail } from '@/utils/email/email';
import { AvError } from '@/utils/error/AvError';
import bcrypt from 'bcrypt';

type ForgotPassProps = PasswordSchemaType & {
    token: string;
};

export const forgotPasswordAction = async (data: EmailSchemaType) => {
    //TODO: Add a rate limiter in future

    const validation = EmailSchema.safeParse(data);

    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
        };
    }

    const { email } = validation.data;

    const user = await getUserByEmail(email);

    if (user) {
        try {
            await sendPasswordResetEmail(user.name, email, user.id);
        } catch (error) {
            let message = 'Something went wrong.';
            if (error instanceof AvError) {
                message = error.message;
            }

            return {
                success: false,
                message,
            };
        }
    }

    return {
        success: true,
        message: 'Check your email and follow the instructions.',
    };
};

export const resetPasswordAction = async (data: ForgotPassProps) => {
    const validation = PasswordSchema.safeParse(data);

    if (!validation.success) {
        return {
            errors: validation.error.issues.map((issue) => ({
                field: issue.path[0],
                message: issue.message,
            })),
        };
    }

    try {
        const { token } = data;

        if (!token) {
            throw new AvError('Invalid verification token.');
        }

        const { password } = validation.data;

        const existingToken = await prisma.verificationToken.findFirst({
            where: {
                token,
                type: 'PASSWORD_RESET',
                expires: {
                    gt: new Date(),
                },
                sent: true,
            },
        });

        if (!existingToken) {
            throw new AvError('Invalid verification token.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: {
                id: existingToken.userId,
            },
            data: {
                password: hashedPassword,
            },
        });

        // Delete all password reset tokens for this user
        await prisma.verificationToken.deleteMany({
            where: {
                userId: existingToken.userId,
                type: 'PASSWORD_RESET',
                sent: true,
            },
        });

        return {
            success: true,
            message: 'Password reset successfully you can login now.',
        };
    } catch (error) {
        let message = 'Password reset failed. Please try again.';

        if (error instanceof AvError) {
            message = error.message;
        }

        return {
            success: false,
            message,
        };
    }
};
