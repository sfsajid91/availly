import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import Link from 'next/link';

type VerifyEmailProps = {
    token: string;
};

export default async function VerifyEmail({ token }: VerifyEmailProps) {
    try {
        // Find the valid verification token in the database
        const existingToken = await prisma.verificationToken.findFirst({
            where: {
                token,
                type: 'EMAIL',
                expires: {
                    gt: new Date(),
                },
            },
            include: {
                user: true,
            },
        });

        if (!existingToken) {
            return <VerificationFailed />;
        }

        if (existingToken.user.emailVerified) {
            await prisma.verificationToken.delete({
                where: {
                    id: existingToken.id,
                },
            });
            return <VerificationSuccess />;
        }

        await prisma.user.update({
            where: {
                id: existingToken.user.id,
            },
            data: {
                emailVerified: new Date().toISOString(),
            },
        });

        await prisma.verificationToken.deleteMany({
            where: {
                userId: existingToken.userId,
                type: 'EMAIL',
                email: existingToken.email,
            },
        });
    } catch (error) {
        return <VerificationFailed />;
    }
    return <VerificationSuccess />;
}

function VerificationFailed() {
    return (
        <div className="space-y-4 text-center">
            <h4 className="text-center text-2xl font-semibold">
                Invalid Verification Link
            </h4>
            <p className="text-center">
                The verification link you clicked is invalid or has expired.
            </p>

            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
        </div>
    );
}

function VerificationSuccess() {
    return (
        <div className="space-y-4 text-center">
            <h4 className="text-center text-2xl font-semibold">
                Email Verified
            </h4>
            <p className="text-center">
                Your email has been verified. You can now login to your account.
            </p>

            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
        </div>
    );
}
