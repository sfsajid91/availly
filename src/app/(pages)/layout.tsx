import Navbar from '@/components/global/navbar/Navbar';
import Footer from '@/components/home/Footer';

export default function PagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
