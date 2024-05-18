import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

type DashboardCardProps = {
    title: string;
    icon: LucideIcon;
    total: number;
    description: string;
};

export default function DashboardCard({
    description,
    icon: Icon,
    title,
    total,
}: Readonly<DashboardCardProps>) {
    return (
        <Card className="inline-flex flex-col">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-lg text-gray-700">{title}</CardTitle>
                <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="inline-flex flex-1 flex-col justify-end gap-2">
                <CardTitle>{total}</CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}
