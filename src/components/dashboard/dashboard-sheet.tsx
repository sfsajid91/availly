'use client';

import logoImg from '@/../public/logo.png';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { PanelLeftIcon, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from './navbar-items';

type DashboardSheetItemProps = {
    item: {
        name: string;
        icon: LucideIcon;
        href: string;
    };
};

export default function DashboardSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeftIcon className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link href="/">
                        <Image
                            src={logoImg}
                            alt="Availly Logo"
                            width={150}
                            priority
                        />
                    </Link>
                    {navItems.map((item) => (
                        <DashboardSheetItem key={item.href} item={item} />
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}

function DashboardSheetItem({ item }: DashboardSheetItemProps) {
    const pathName = usePathname();
    return (
        <Link
            href={item.href}
            className={cn(
                'flex items-center gap-4 rounded px-2.5 py-2 text-muted-foreground hover:text-foreground',
                {
                    'bg-accent text-foreground': pathName === item.href,
                }
            )}
        >
            <item.icon className="h-5 w-5" />
            {item.name}
        </Link>
    );
}
