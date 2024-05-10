import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import VerifyEmail from './verify-token';

type EmailVerificationPageProps = {
    searchParams: {
        token: string;
    };
};

export default function EmailVerificationPage({
    searchParams: { token },
}: EmailVerificationPageProps) {
    return (
        <>
            {token && (
                <Suspense fallback={<Button loading>Verifying Email</Button>}>
                    <VerifyEmail token={token} />
                </Suspense>
            )}

            {!token && (
                <div className="space-y-4 py-2 text-center">
                    <h1 className="text-xl font-semibold">
                        Invalid Verification Link
                    </h1>
                    <p>
                        The verification link you clicked is invalid or has
                        expired.
                    </p>
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                </div>
            )}
        </>
    );
}
