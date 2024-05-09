import prisma from '@/lib/prisma';
import VerificationEmail from '@/utils/email/template/verification-email';
import { AvError } from '@/utils/error/AvError';
import { resend } from '@/utils/resend';
import { headers } from 'next/headers';

export const sendVerificationEmail = async (
    email: string,
    userId: string,
    name: string
) => {
    const header = headers();
    const host = header.get('x-forwarded-host');
    const protocol = header.get('x-forwarded-proto');
    const url = `${protocol}://${process.env.VERCEL_URL || host}`;

    const existingToken = await prisma.verificationToken.findFirst({
        where: {
            userId,
            type: 'EMAIL',
            expires: {
                gt: new Date(),
            },
        },
    });

    if (existingToken && existingToken.sent) {
        throw new AvError('Verification email already sent');
    }

    const time = process.env.VERIFICATION_TOKEN_EXPIRY_IN_MS
        ? Number(process.env.VERIFICATION_TOKEN_EXPIRY_IN_MS)
        : 24 * 60 * 60 * 1000;

    const expires = new Date(Date.now() + time);

    const newToken = await prisma.verificationToken.create({
        data: {
            email,
            userId,
            type: 'EMAIL',
            expires,
        },
    });

    const verificationUrl = `${url}/verify?token=${newToken.token}`;

    const EmailTemplate = VerificationEmail({
        verificationUrl,
        name,
    });
    const from = `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`;

    const { error } = await resend.emails.send({
        from,
        to: email,
        subject: 'Verify your Availly email address',
        react: EmailTemplate,
    });

    if (error) {
        throw new AvError('Failed to send verification email');
    }

    await prisma.verificationToken.update({
        where: {
            id: newToken.id,
        },
        data: {
            sent: true,
        },
    });
};
