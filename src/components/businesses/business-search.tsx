'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function BusinessSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Debounce the search input to avoid unnecessary requests
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term.trim()) {
            params.set('query', term.trim());
        } else {
            params.delete('query');
        }

        // replacing the url with the new search term
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <div className="relative flex-1 md:flex-none">
            <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500 dark:text-gray-400" />
            <Input
                className="focus:ring-primary-500 w-full rounded-md bg-white py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-gray-900 dark:text-gray-100 md:w-64"
                placeholder="Search businesses"
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
}
