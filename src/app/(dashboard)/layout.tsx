import DashboardNav from '@/components/dashboard/dashboard-navbar';
import Sidebar from '@/components/dashboard/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative h-screen w-full">
            <TooltipProvider>
                <Sidebar />
            </TooltipProvider>

            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-52 lg:pl-[17rem]">
                <DashboardNav />
                <main className="container py-4">{children}</main>
            </div>
        </div>
    );
}
