import { StarHalfIcon, StarIcon, TagIcon } from 'lucide-react';
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
                    className="transition duration-300 group-hover:scale-125"
                    height={400}
                    src={image || '/home/booked.svg'}
                    style={{
                        // aspectRatio: '80/80',
                        objectFit: 'cover',
                    }}
                    width={400}
                />
            </div>
            <div className="flex flex-1 flex-col p-4">
                <Link
                    href={`/business/${slug}`}
                    className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100"
                >
                    {name}
                </Link>
                <p className="mb-4 flex-1 text-gray-600 dark:text-gray-400">
                    {description}
                </p>
                {/* Reviews  */}
                <div className="mb-2 flex items-center space-x-2">
                    {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                        <StarIcon
                            className="size-5 fill-yellow-500 text-yellow-500"
                            key={i}
                        />
                    ))}
                    {rating % 1 >= 0 && (
                        <>
                            <div className="relative overflow-hidden p-0">
                                <StarIcon className="size-5  text-yellow-500" />
                                <StarHalfIcon className="absolute bottom-0 left-0 size-5 fill-yellow-500 text-yellow-500" />
                            </div>
                        </>
                    )}

                    {Array.from({ length: 5 - Math.ceil(rating) }).map(
                        (_, i) => (
                            <StarIcon
                                className="size-5 text-gray-400"
                                key={i}
                            />
                        )
                    )}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {rating.toFixed(1)}
                    </span>
                </div>
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
