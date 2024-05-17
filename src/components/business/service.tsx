import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Service() {
    return (
        <Card>
            <CardContent className="space-y-2 pt-6">
                <h3 className="text-lg font-semibold">Hair Coloring</h3>
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">60 min</span>
                    <span className="text-gray-500">$50</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    Transform your look with our expert hair coloring services.
                </p>
                <Button size="sm">Book Now</Button>
            </CardContent>
        </Card>
    );
}
