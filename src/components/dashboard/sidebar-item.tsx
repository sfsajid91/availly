'use client';

import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { CircleIcon, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarItemProps = {
    item: {
        name: string;
        icon: LucideIcon;
        href: string;
    };
};

type SidebarCollapsibleProps = {
    name: string;
    icon: LucideIcon;
    items: {
        name: string;
        href: string;
    }[];
};

export default function SidebarItem({ item }: SidebarItemProps) {
    const { icon: Icon, name, href } = item;

    const pathName = usePathname();

    return (
        <Button
            asChild
            variant="ghost"
            className={cn('w-full justify-start', {
                'bg-accent': pathName === href,
            })}
        >
            <Link href={href}>
                <Icon className="mr-2 size-4 lg:mr-4" />
                {name}
            </Link>
        </Button>
    );
}

export const SidebarCollapsibleItem = ({
    icon: Icon,
    items,
    name,
}: SidebarCollapsibleProps) => {
    const pathName = usePathname();
    const active = items.some((item) => item.href === pathName);
    return (
        <Collapsible defaultOpen={active} className="w-full">
            <Button
                asChild
                variant="ghost"
                className={cn('w-full justify-start', {
                    'bg-accent': active,
                })}
            >
                <CollapsibleTrigger>
                    <Icon className="mr-2 size-4 lg:mr-4" />
                    {name}
                </CollapsibleTrigger>
            </Button>
            <CollapsibleContent>
                <ul className="flex flex-col gap-2 py-2 pl-2">
                    {items.map((item) => (
                        <li key={item.href}>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'w-full justify-start hover:bg-inherit hover:text-blue-500',
                                    {
                                        'text-blue-500': pathName === item.href,
                                    }
                                )}
                                size="sm"
                            >
                                <Link href={item.href}>
                                    <CircleIcon className="mr-2 size-2 lg:mr-4" />
                                    {item.name}
                                </Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
};
