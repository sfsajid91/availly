import logoImg from '@/../public/logo.png';
import AuthWrapper from '@/components/auth-wrapper';
import Image from 'next/image';
import Link from 'next/link';
import NavItems from './nav-items';

export default async function Navbar() {
    return (
        <nav className="wrapper sticky top-0 z-50 flex w-full items-center justify-between bg-white/60 py-4 shadow backdrop-blur-sm">
            <Link href="/">
                <Image src={logoImg} alt="Availly Logo" width={150} />
            </Link>

            <ul className="flex gap-4">
                <AuthWrapper>
                    <NavItems />
                </AuthWrapper>
            </ul>
        </nav>
    );
}
