import { cn } from '@/lib/utils';
import { StarHalfIcon, StarIcon } from 'lucide-react';

type RatingProps = {
    rating: number;
    className?: string;
};

function NoReviews({ className }: { className?: string }) {
    return (
        <div className={cn('flex items-center space-x-2', className)}>
            {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon className="size-5 text-gray-500" key={i} />
            ))}
            <span className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                No reviews
            </span>
        </div>
    );
}

export default function Rating({ rating, className }: RatingProps) {
    if (rating <= 0) {
        return <NoReviews />;
    }
    if (rating < 1) {
        rating = 1;
    }
    if (rating > 5) {
        rating = 5;
    }

    return (
        <div className={cn('flex items-center space-x-2', className)}>
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

            {Array.from({ length: 5 - Math.ceil(rating) }).map((_, i) => (
                <StarIcon className="size-5 text-gray-400" key={i} />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400">
                {rating.toFixed(1)}
            </span>
        </div>
    );
}
