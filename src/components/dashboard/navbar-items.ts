import { HomeIcon, SettingsIcon, UserIcon } from 'lucide-react';

export const navItems = [
    { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
    {
        name: 'Profile',
        icon: UserIcon,
        href: '/dashboard/profile',
    },
    { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon },
];
