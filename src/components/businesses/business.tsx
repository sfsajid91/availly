import Rating from '@/components/business/rating';
import { TagIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type BusinessProps = {
    name: string;
    description: string;
    rating: number;
    category: string;
    image: string;
    slug: string;
};

export default function Business({
    category,
    description,
    name,
    rating,
    image,
    slug,
}: BusinessProps) {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-900">
            <div className="group flex h-32 items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-800">
                <Image
                    alt={name}
                    className="w-full object-cover transition duration-300 group-hover:scale-125"
                    height={400}
                    src={image || '/home/booked.svg'}
                    width={400}
                />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <Link
                    href={`/business/${slug}`}
                    className="text-lg font-bold text-gray-900 dark:text-gray-100"
                >
                    {name}
                </Link>
                <p className="flex-1 pb-2 text-gray-600 dark:text-gray-400">
                    {description}
                </p>
                {/* Reviews  */}
                <Rating rating={rating} />
                <div className="flex items-center space-x-2">
                    <TagIcon className="size-5 text-gray-500 dark:text-gray-400" />
                    <Link
                        href={`/business?category=${category}`}
                        className="text-sm text-gray-600 dark:text-gray-400"
                    >
                        {category[0].toUpperCase() + category.slice(1)}
                    </Link>
                </div>
            </div>
        </div>
    );
}
