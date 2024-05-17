import { headers } from 'next/headers';

export const getHeaderUrl = () => {
    const headerList = headers();
    const host = headerList.get('x-forwarded-host');
    const protocol = headerList.get('x-forwarded-proto');
    const url = `${protocol}://${process.env.VERCEL_PROJECT_PRODUCTION_URL || host}`;
    const path = headerList.get('next-url');

    return { url, path, fullUrl: `${url}${path}` };
};
