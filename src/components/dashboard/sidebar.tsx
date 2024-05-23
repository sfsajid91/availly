'use client';

import logoImg from '@/../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { navItems } from './navbar-items';
import SidebarItem, { SidebarCollapsibleItem } from './sidebar-item';

export default function Sidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-52 flex-col overflow-y-auto border-r bg-background px-4 scrollbar-thin sm:flex lg:w-[17rem] lg:px-8">
            <nav className="flex flex-col items-center justify-center gap-2 px-2 sm:py-5">
                <Link href="/">
                    <Image
                        src={logoImg}
                        alt="Availly Logo"
                        width={150}
                        priority
                        className="mb-4"
                    />
                    <span className="sr-only">Availly</span>
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
        </aside>
    );
}
