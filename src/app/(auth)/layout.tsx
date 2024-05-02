import GoogleSignin from '@/components/forms/google-signin';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[calc(100dvh-10rem)] items-center px-4 py-8">
            <div className="mx-auto w-full rounded p-4 shadow md:w-96">
                {children}
                <GoogleSignin />
            </div>
        </div>
    );
}
