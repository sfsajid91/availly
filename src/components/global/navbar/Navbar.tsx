import logoImg from '@/../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import NavItems from './nav-items';

export default async function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/60 shadow backdrop-blur-sm">
            <div className="wrapper container flex h-16 w-full items-center justify-between py-2">
                <Link href="/">
                    <Image
                        src={logoImg}
                        alt="Availly Logo"
                        width={150}
                        priority
                    />
                </Link>

                <ul className="flex gap-4">
                    <NavItems />
                </ul>
            </div>
        </nav>
    );
}
