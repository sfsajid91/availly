import Business from '@/components/businesses/business';
import BusinessHeader from '@/components/businesses/business-header';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { getAllBusinesses } from '@/lib/mock-data';

export default async function BusinessesPage() {
    const businesses = getAllBusinesses();

    return (
        <main className="bg-gray-100 py-8 dark:bg-gray-800 md:py-12">
            <div className="wrapper container mx-auto">
                <BusinessHeader />

                {businesses.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {businesses.map((business) => (
                            <Business key={business.slug} {...business} />
                        ))}
                    </div>
                )}

                {
                    // No businesses found
                    businesses.length === 0 && (
                        <div className="flex h-64 items-center justify-center">
                            <p className="text-lg text-gray-500 dark:text-gray-400">
                                No businesses found.
                            </p>
                        </div>
                    )
                }

                {/* Pagination  */}
                <div className="mt-8 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </main>
    );
}
