import DashboardCard from '@/components/dashboard/dashboard-card';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item, index) => (
                    <DashboardCard key={index} {...item} />
                ))}
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <div className="relative h-full max-h-96 overflow-auto rounded border-t">
                        <Table>
                            <TableCaption>
                                A list of your recent 10 activity.
                            </TableCaption>
                            <TableHeader className="sticky top-0 bg-white shadow-sm">
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        Activity
                                    </TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">
                                        View
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from(
                                    { length: 10 },
                                    (_, i) => i + 1
                                ).map((index) => (
                                    <TableRow key={index}>
                                        <TableCell>Appointment</TableCell>
                                        <TableCell>Create</TableCell>
                                        <TableCell>
                                            {new Date().toDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>
        </>
    );
}
