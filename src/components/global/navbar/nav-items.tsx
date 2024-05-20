'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { LogInIcon, UserIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import NavDropdown from './nav-dropdown';

const dropdownItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Profile', href: '/dashboard/profile' },
];

export default function NavItems() {
    const { status, data: session } = useSession();

    return (
        <>
            {
                // Skeleton loader for the nav items
                status === 'loading' && (
                    <>
                        <li className="hidden md:inline">
                            <Skeleton className="h-10 w-24" />
                        </li>
                        <li>
                            <Skeleton className="h-10 w-24" />
                        </li>
                    </>
                )
            }
            {status === 'unauthenticated' && (
                <>
                    <li className="hidden md:inline">
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
                                    <LogInIcon className="size-4" />
                                    Login
                                </div>
                            </Link>
                        </Button>
                    </li>
                </>
            )}

            {status === 'authenticated' && session.user && (
                <li>
                    <NavDropdown items={dropdownItems} />
                </li>
            )}
        </>
    );
}
