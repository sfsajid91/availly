import DashboardCard from '@/components/dashboard/dashboard-card';
import { BriefcaseIcon, CalendarIcon, StarIcon } from 'lucide-react';

const items = [
    {
        title: 'Upcoming Appointments',
        icon: CalendarIcon,
        total: 10,
        description: 'In the next 7 days',
    },
    {
        title: 'Past Appointments',
        icon: CalendarIcon,
        total: 20,
        description: 'All time',
    },
    {
        title: 'Booking History',
        icon: CalendarIcon,
        total: 200,
        description: 'Total bookings',
    },
    {
        title: 'Your Businesses',
        icon: BriefcaseIcon,
        total: 2,
        description: 'Businesses you own',
    },
    {
        title: 'Reviews',
        icon: StarIcon,
        total: 45,
        description: 'Reviews you have given',
    },
];

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, index) => (
                <DashboardCard key={index} {...item} />
            ))}
        </div>
    );
}
