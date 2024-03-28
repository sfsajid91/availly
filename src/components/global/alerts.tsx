import { AlertCircleIcon } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';

type AlertType = {
    message: string;
};

export function AlertDestructive({ message }: AlertType) {
    return (
        <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}

export function AlertSuccess({ message }: AlertType) {
    return (
        <Alert variant="success">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}
