import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        template: '%s | Availly',
        default: 'Availly -  Appointments made effortless',
    },
    description:
        'Availy simplifies appointment booking for businesses and users. Schedule appointments effortlessly, save time, and manage your schedule with ease',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <NextTopLoader height={4} showSpinner={false} />
                {children}
            </body>
        </html>
    );
}
