import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import Rating from './rating';

export default function Review() {
    return (
        <Card className="overflow-hidden shadow">
            <CardContent className="space-y-2 pt-6">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage
                            alt="John Doe"
                            src="/placeholder-avatar.jpg"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-lg font-semibold">John Doe</h3>
                        <Rating rating={4.5} />
                    </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    Acme Inc. provided excellent service. The team was
                    professional and completed the job on time. I highly
                    recommend them.
                </p>
            </CardContent>
        </Card>
    );
}
