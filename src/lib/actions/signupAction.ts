'use server';

import prisma from '@/lib/prisma';
import {
    SignupSchema,
    type SignupSchemaType,
} from '@/lib/schema/signup-schema';
import { sendVerificationEmail } from '@/utils/email/email';
import bcrypt from 'bcrypt';

export const signupAction = async (data: SignupSchemaType) => {
    try {
        const validation = SignupSchema.safeParse(data);

        if (!validation.success) {
            return {
                errors: validation.error.issues.map((issue) => ({
                    field: issue.path[0],
                    message: issue.message,
                })),
            };
        }

        const { name, email, password } = validation.data;

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return {
                errors: [
                    {
                        field: 'email',
                        message: 'User already exists with this email.',
                    },
                ],
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // disable sending email in test environment
        if (process.env.ENVIRONMENT !== 'test') {
            await sendVerificationEmail(email, user.id, name);
        }

        return {
            success: true,
            message: 'Check your email for verification link.',
        };
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong. Please try again.',
        };
    }
};
