'use client';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardBreadcrumb() {
    const pathName = usePathname();
    const path = pathName.split('/').filter(Boolean);
    if (path.length === 1 && path[0] === 'dashboard') {
        return null;
    }
    const last = path[path.length - 1];
    path.splice(0);
    path.splice(-1);

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {path.map((item, index) => (
                    <BreadcrumbItem key={index}>
                        <BreadcrumbLink asChild>
                            <Link href={`/${item}`}>
                                {item[0].toUpperCase() + item.slice(1)}
                            </Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                    </BreadcrumbItem>
                ))}
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {last[0].toUpperCase() + last.slice(1)}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
