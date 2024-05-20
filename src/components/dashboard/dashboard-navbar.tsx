import NavDropdown from '@/components/global/navbar/nav-dropdown';
import { Input } from '@/components/ui/input';
import { getSession } from '@/lib/getSession';
import { SearchIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import DashboardBreadcrumb from './dashboard-breadcrumb';
import DashboardSheet from './dashboard-sheet';

const dropdownItems = [
    { label: 'Appointments', href: '/dashboard/appoinments' },
    { label: 'Profile', href: '/dashboard/profile' },
    { label: 'Settings', href: '/dashboard/settings' },
];

export default async function DashboardNav() {
    const session = await getSession();
    if (!session?.user) return redirect('/login');

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <DashboardSheet />
            <DashboardBreadcrumb />
            <div className="relative ml-auto flex-1 md:grow-0">
                <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>

            <NavDropdown items={dropdownItems} />
        </header>
    );
}
