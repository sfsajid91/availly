import logoImg from '@/../public/logo.png';
import AuthWrapper from '@/components/auth-wrapper';
import Image from 'next/image';
import Link from 'next/link';
import NavItems from './nav-items';

export default async function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/60 shadow backdrop-blur-sm">
            <div className="wrapper container flex w-full items-center justify-between py-4">
                <Link href="/">
                    <Image
                        src={logoImg}
                        alt="Availly Logo"
                        width={150}
                        priority
                    />
                </Link>

                <ul className="flex gap-4">
                    <AuthWrapper>
                        <NavItems />
                    </AuthWrapper>
                </ul>
            </div>
        </nav>
    );
}
