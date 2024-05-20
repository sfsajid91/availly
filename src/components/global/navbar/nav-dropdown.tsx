'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { logoutAction } from '@/lib/actions/loginAction';
import { splitName } from '@/utils/splitName';
import { LogOutIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type NavDropdownProps = {
    items: {
        label: string;
        href: string;
    }[];
};

export default function NavDropdown({ items }: NavDropdownProps) {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <Skeleton className="h-10 w-10 rounded-full" />;
    }

    if (!session?.user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full focus-visible:ring-transparent"
                >
                    <Avatar>
                        <AvatarImage
                            src={session.user.avatar as string}
                            alt={session.user.name!}
                        />

                        <AvatarFallback>
                            {splitName(session.user.name!)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {items.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                        <Link className="cursor-pointer" href={item.href}>
                            {item.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <form action={logoutAction}>
                    <DropdownMenuItem className="p-0">
                        <Button size="sm" className="w-full" type="submit">
                            <LogOutIcon className="mr-2 size-4" />
                            Logout
                        </Button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
