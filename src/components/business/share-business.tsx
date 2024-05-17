import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import Link from 'next/link';

type ShareBusinessProps = {
    url: string;
};

export default function ShareBusiness({ url }: ShareBusinessProps) {
    return (
        <div>
            <h2 className="mb-4 text-xl font-bold">Share</h2>
            <div className="flex items-center gap-4">
                <Link
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                    target="_blank"
                >
                    <FacebookIcon className="h-6 w-6" />
                    <span className="sr-only">Share on Facebook</span>
                </Link>
                <Link
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={`https://twitter.com/intent/tweet?url=${url}`}
                    target="_blank"
                >
                    <TwitterIcon className="h-6 w-6" />
                    <span className="sr-only">Share on Twitter</span>
                </Link>
                <Link
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={`https://www.linkedin.com/shareArticle?url=${url}`}
                    target="_blank"
                >
                    <LinkedinIcon className="h-6 w-6" />
                    <span className="sr-only">Share on LinkedIn</span>
                </Link>
            </div>
        </div>
    );
}
