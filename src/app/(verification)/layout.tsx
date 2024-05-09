import logoImg from '@/../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function VerificationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-dvh items-center px-4 py-8">
            <main className="mx-auto flex w-full flex-col space-y-4 rounded p-4 shadow sm:w-96">
                <Link href="/" className="mx-auto">
                    <Image src={logoImg} alt="Availly Logo" width={150} />
                </Link>
                {children}
            </main>
        </div>
    );
}
