import Rating from '@/components/business/rating';
import Review from '@/components/business/review';
import Service from '@/components/business/service';
import { getBusinessBySlug } from '@/lib/mock-data';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ShareBusiness from '@/components/business/share-business';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getHeaderUrl } from '@/utils/getHeaderUrl';

type BusinessPageProps = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({
    params,
}: BusinessPageProps): Promise<Metadata> {
    // read route params
    const { slug } = params;

    // fetch data
    const business = await getBusinessBySlug(slug);

    if (!business) {
        notFound();
    }

    return {
        title: business.name,
    };
}

export default function BusinessPage({ params: { slug } }: BusinessPageProps) {
    const business = getBusinessBySlug(slug);
    const { fullUrl } = getHeaderUrl();

    if (!business) {
        notFound();
    }

    return (
        <main className="wrapper container mx-auto space-y-8 py-12 md:py-16">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/business">Businesses</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{business.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* Header  */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                <div className="max-h-72 overflow-hidden rounded bg-gray-500 md:max-w-sm">
                    <Image
                        alt={business.name}
                        className="aspect-video h-auto w-full object-cover object-center md:aspect-square"
                        height={500}
                        src={business.image}
                        width={500}
                    />
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold sm:text-4xl">
                            {business.name}
                        </h1>
                        <div className="flex items-center justify-between">
                            <Rating rating={business.rating} />
                            <Link href="#" className="text-blue-500">
                                (12 reviews)
                            </Link>
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        {business.description}
                    </p>
                    <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            {business.category[0].toUpperCase() +
                                business.category.slice(1)}
                        </div>
                        <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            Beauty
                        </div>
                    </div>
                </div>
            </div>

            {/* Services  */}
            <section>
                <h2 className="mb-4 text-xl font-bold">Our Services</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                </div>
            </section>

            {/* Reviews  */}
            <section>
                <h2 className="mb-4 text-xl font-bold">Customer Reviews</h2>
                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                    </div>
                </div>
            </section>

            {/* Contact Information  */}
            <section className="grid gap-4 sm:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-xl font-bold">
                        Contact Information
                    </h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <p className="text-gray-500 dark:text-gray-400">
                                123 Main St, Anytown USA 12345
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <p className="text-gray-500 dark:text-gray-400">
                                (123) 456-7890
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <MailIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <p className="text-gray-500 dark:text-gray-400">
                                info@acmeinc.com
                            </p>
                        </div>
                    </div>
                </div>
                <ShareBusiness url={fullUrl} />
            </section>
        </main>
    );
}
