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

const businesses = [
    {
        name: 'Sushi Place',
        description:
            'Sushi Place is a restaurant that serves delicious sushi. It is located in the heart of the city.',
        rating: 3.2,
        category: 'restaurant',
        image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
        slug: 'sushi-place',
    },
    {
        name: 'Jack’s Barbershop',
        description:
            'Jack’s Barbershop is a barbershop that offers haircuts and shaves.',
        rating: 4.5,
        category: 'salon',
        image: 'https://images.pexels.com/photos/4625616/pexels-photo-4625616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        slug: 'jacks-barbershop',
    },
    {
        name: 'The Coffee Shop',
        description:
            'The Coffee Shop is a cozy cafe that serves coffee and pastries.',
        rating: 4.8,
        category: 'cafe',
        image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=600',
        slug: 'the-coffee-shop',
    },
];

export default async function BusinessPage() {
    return (
        <main className="bg-gray-100 py-8 dark:bg-gray-800 md:py-12">
            <div className="wrapper container mx-auto">
                <BusinessHeader />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {businesses.map((business) => (
                        <Business key={business.slug} {...business} />
                    ))}
                </div>

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
