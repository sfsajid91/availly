'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({
    children = 'Submit',
}: {
    children: React.ReactNode;
}) {
    const { pending } = useFormStatus();

    return (
        <Button
            aria-disabled={pending}
            loading={pending}
            size="lg"
            type="submit"
            className="w-full"
        >
            {children}
        </Button>
    );
}
