import ResetPasswordForm from '@/components/forms/reset-password-form';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import Link from 'next/link';

type VerifyPassResetTokenProps = {
    token: string;
};

export default async function VerifyPassResetToken({
    token,
}: VerifyPassResetTokenProps) {
    try {
        // Find the valid verification token in the database
        const existingToken = await prisma.verificationToken.findFirst({
            where: {
                token,
                type: 'PASSWORD_RESET',
                expires: {
                    gt: new Date(),
                },
            },
        });

        if (!existingToken) {
            return <VerificationFailed />;
        }

        return <ResetPasswordForm token={existingToken.token} />;
    } catch (error) {
        return <VerificationFailed />;
    }
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
