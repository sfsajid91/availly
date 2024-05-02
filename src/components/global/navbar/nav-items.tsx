'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { logoutAction } from '@/lib/actions/loginAction';
import { LogInIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function NavItems() {
    const { status } = useSession();

    // const handleLogout = async () => {
    //     await signOut();
    // };

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

            {status === 'authenticated' && (
                <li>
                    <form action={logoutAction}>
                        <Button type="submit" size="default">
                            <LogOutIcon className="mr-2 size-4" />
                            Logout
                        </Button>
                    </form>
                </li>
            )}
        </>
    );
}
