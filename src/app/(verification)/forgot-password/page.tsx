import ForgotPasswordForm from '@/components/forms/forgot-password';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import VerifyToken from './verify-token';

type ForgotPasswordPageProps = {
    searchParams: {
        token: string;
    };
};

export const metadata: Metadata = {
    title: 'Reset Password',
};

export default function ForgotPasswordPage({
    searchParams: { token },
}: ForgotPasswordPageProps) {
    if (!token) {
        return <ForgotPasswordForm />;
    }

    return (
        <Suspense fallback={<Button loading>Verifying</Button>}>
            <VerifyToken token={token} />
        </Suspense>
    );
}
