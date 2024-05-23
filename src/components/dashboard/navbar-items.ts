import {
    BriefcaseBusinessIcon,
    CalendarIcon,
    HomeIcon,
    SettingsIcon,
    UserIcon,
} from 'lucide-react';

export const navItems = [
    { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
    {
        name: 'Profile',
        icon: UserIcon,
        children: [
            { name: 'My Profile', href: '/dashboard/profile' },
            { name: 'Edit Profile', href: '/dashboard/profile/edit' },
        ],
    },
    {
        name: 'Appointments',
        icon: CalendarIcon,
        children: [
            { name: 'Upcoming', href: '/dashboard/appointments/upcoming' },
            { name: 'Past', href: '/dashboard/appointments/past' },
            {
                name: 'Booking History',
                href: '/dashboard/appointments/history',
            },
        ],
    },
    {
        name: 'Business',
        icon: BriefcaseBusinessIcon,
        children: [
            { name: 'My Businesses', href: '/dashboard/business' },
            { name: 'Add Business', href: '/dashboard/business/new' },
            { name: 'Reviews', href: '/dashboard/business/reviews' },
        ],
    },
    { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon },
];
