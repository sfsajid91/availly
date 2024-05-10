import RegistrationForm from '@/components/forms/registration-form';
import Link from 'next/link';

export default function RegistrationPage() {
    return (
        <>
            <div className="mb-6 space-y-2">
                <h4 className="text-center text-2xl font-bold text-gray-700">
                    Register for an account
                </h4>
                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="text-blue-500 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
            <RegistrationForm />
        </>
    );
}
