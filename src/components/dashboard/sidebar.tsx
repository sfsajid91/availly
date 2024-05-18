'use client';

import iconImg from '@/../public/icon.png';
import { SettingsIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { navItems } from './navbar-items';
import SidebarItem from './sidebar-item';

export default function Sidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link href="/">
                    <Image
                        src={iconImg}
                        alt="Availly Logo"
                        width={30}
                        priority
                    />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                {navItems.map((item) => (
                    <SidebarItem key={item.href} item={item} />
                ))}
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <SidebarItem
                    item={{
                        name: 'Settings',
                        icon: SettingsIcon,
                        href: '/dashboard/settings',
                    }}
                />
            </nav>
        </aside>
    );
}
