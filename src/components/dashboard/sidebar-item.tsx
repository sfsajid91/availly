'use client';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarItemProps = {
    item: {
        name: string;
        icon: LucideIcon;
        href: string;
    };
};

export default function SidebarItem({ item }: SidebarItemProps) {
    const { icon: Icon, name, href } = item;

    const pathName = usePathname();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={href}
                    className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                        {
                            'bg-accent text-foreground': pathName === href,
                        }
                    )}
                >
                    <Icon className="size-5" />
                    <span className="sr-only">{name}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{name}</TooltipContent>
        </Tooltip>
    );
}
