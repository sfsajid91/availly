'use client';

import { cn } from '@/lib/utils';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleContent = React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
    React.ComponentPropsWithoutRef<
        typeof CollapsiblePrimitive.CollapsibleContent
    >
>(({ className, children, ...props }, ref) => (
    <CollapsiblePrimitive.CollapsibleContent
        ref={ref}
        className={cn(
            'overflow-hidden text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
            className
        )}
        {...props}
    >
        {children}
    </CollapsiblePrimitive.CollapsibleContent>
));

const CollapsibleTrigger = React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <CollapsiblePrimitive.Trigger
        ref={ref}
        className={cn('[&[data-state=open]>.icon]:rotate-180', className)}
        {...props}
    >
        {children}
        <ChevronDown className="icon ml-auto size-4 transition-all" />
    </CollapsiblePrimitive.Trigger>
));

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
