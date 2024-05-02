import LoginForm from '@/components/forms/login-form';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Login',
};

export default function LoginPage() {
    return (
        <>
            <div className="mb-6 space-y-2">
                <h4 className="text-center text-2xl font-bold text-gray-700">
                    Login to your account
                </h4>
                <p className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/registration"
                        className="text-blue-500 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
            <Suspense>
                <LoginForm />
            </Suspense>
        </>
    );
}
