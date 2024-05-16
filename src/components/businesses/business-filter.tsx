'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { FilterIcon, FilterXIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function BusinessFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // const [filter, setFilter] = useState(false);
    const params = new URLSearchParams(searchParams);

    const hasFilters =
        params.has('category') || params.has('rating') || params.has('sort');

    const ratingDefaultValue = ['all', 'gt4', 'gt3'];
    const sortDefaultValue = [
        'featured',
        'newest',
        'rating-asc',
        'rating-desc',
    ];
    const categoryDefaultValue = ['restaurant', 'salon', 'fitness', 'retail'];

    const getDefaultValue = (
        name: string,
        defaultValues: string[],
        selected?: boolean
    ) => {
        const value = searchParams.get(name);

        if (value && defaultValues.includes(value)) {
            return value;
        }

        return selected ? defaultValues[0] : '';
    };

    const handleFilter = (name: string, value: string) => {
        // const params = new URLSearchParams(searchParams);

        if (value.trim()) {
            params.set(name, value.trim());
        } else {
            params.delete(name);
        }

        // replacing the url with the new search term
        replace(`${pathname}?${params.toString()}`);
    };

    const clearFilters = () => {
        // const params = new URLSearchParams(searchParams);

        params.delete('category');
        params.delete('rating');
        params.delete('sort');

        // replacing the url with the new search term
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex gap-2">
            <AnimatePresence>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="flex items-center space-x-2"
                            variant="outline"
                        >
                            <FilterIcon className="size-5" />
                            <span className="hidden sm:inline">Filters</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 p-4">
                        <div className="space-y-4">
                            <div>
                                <Label>
                                    Category
                                    <Select
                                        defaultValue={getDefaultValue(
                                            'category',
                                            categoryDefaultValue
                                        )}
                                        onValueChange={(value) =>
                                            handleFilter('category', value)
                                        }
                                    >
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="restaurant">
                                                Restaurants
                                            </SelectItem>
                                            <SelectItem value="salon">
                                                Salons
                                            </SelectItem>
                                            <SelectItem value="fitness">
                                                Fitness
                                            </SelectItem>
                                            <SelectItem value="retail">
                                                Retail
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Label>
                            </div>
                            <div>
                                <Label htmlFor="rating">Rating</Label>
                                <RadioGroup
                                    className="mt-2 space-y-2"
                                    defaultValue={getDefaultValue(
                                        'rating',
                                        ratingDefaultValue,
                                        true
                                    )}
                                    id="rating"
                                    onValueChange={(value) =>
                                        handleFilter('rating', value)
                                    }
                                >
                                    <Label
                                        className="flex items-center space-x-2"
                                        htmlFor="rating-all"
                                    >
                                        <RadioGroupItem
                                            id="rating-all"
                                            value="all"
                                        />
                                        <span>All</span>
                                    </Label>
                                    <Label
                                        className="flex items-center space-x-2"
                                        htmlFor="rating-4-up"
                                    >
                                        <RadioGroupItem
                                            id="rating-4-up"
                                            value="gt4"
                                        />
                                        <span>4 stars and up</span>
                                    </Label>
                                    <Label
                                        className="flex items-center space-x-2"
                                        htmlFor="rating-3-up"
                                    >
                                        <RadioGroupItem
                                            id="rating-3-up"
                                            value="gt3"
                                        />
                                        <span>3 stars and up</span>
                                    </Label>
                                </RadioGroup>
                            </div>
                            <div>
                                <Label>
                                    Sort by
                                    <Select
                                        defaultValue={getDefaultValue(
                                            'sort',
                                            sortDefaultValue
                                        )}
                                        onValueChange={(value) =>
                                            handleFilter('sort', value)
                                        }
                                    >
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Select sorting option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="featured">
                                                Featured
                                            </SelectItem>
                                            <SelectItem value="newest">
                                                Newest
                                            </SelectItem>
                                            <SelectItem value="rating-asc">
                                                Rating: Low to High
                                            </SelectItem>
                                            <SelectItem value="rating-desc">
                                                Rating: High to Low
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Label>
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                {hasFilters && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 10 }}
                    >
                        <Button variant="outline" onClick={clearFilters}>
                            <FilterXIcon className="size-5" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
