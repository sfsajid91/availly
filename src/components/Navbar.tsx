import { Button } from '@/components/ui/button';
import { LockIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="wrapper sticky top-0 z-50 flex w-full items-center justify-between bg-white/60 py-4 shadow backdrop-blur-sm">
            <Image src="/logo.png" alt="Next.js" height={100} width={150} />

            <ul className="flex gap-4">
                <li>
                    <Button variant="outline2" asChild>
                        <Link href="/registration">
                            <div className="flex items-center gap-2">
                                <UserIcon className="size-4" />
                                Register
                            </div>
                        </Link>
                    </Button>
                </li>
                <li>
                    <Button size="default" asChild>
                        <Link href="/login">
                            <div className="flex items-center gap-2">
                                <LockIcon className="size-4" />
                                Login
                            </div>
                        </Link>
                    </Button>
                </li>
            </ul>
        </nav>
    );
}
