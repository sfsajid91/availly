'use client';

import logoImg from '@/../public/logo.png';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PanelLeftIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { navItems } from './navbar-items';
import SidebarItem, { SidebarCollapsibleItem } from './sidebar-item';

export default function DashboardSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeftIcon className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto sm:max-w-xs">
                <nav className="grid gap-4 text-lg font-medium">
                    <Link href="/">
                        <Image
                            src={logoImg}
                            alt="Availly Logo"
                            width={150}
                            priority
                        />
                    </Link>
                    {navItems.map((item) =>
                        item.children ? (
                            <SidebarCollapsibleItem
                                key={item.name}
                                icon={item.icon}
                                name={item.name}
                                items={item.children}
                            />
                        ) : (
                            <SidebarItem
                                key={item.name}
                                item={{
                                    name: item.name,
                                    icon: item.icon,
                                    href: item.href,
                                }}
                            />
                        )
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
