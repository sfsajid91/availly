import BusinessFilter from '@/components/businesses/business-filter';
import BusinessSearch from '@/components/businesses/business-search';

export default function BusinessHeader() {
    return (
        <div className="mb-6 flex flex-col items-center justify-between md:mb-8 md:flex-row">
            <div className="mb-4 flex-1 md:mb-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
                    Businesses
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Find the perfect business for your needs
                </p>
            </div>
            <div className="flex w-full items-center space-x-4 md:w-auto">
                <BusinessSearch />
                <BusinessFilter />
            </div>
        </div>
    );
}
