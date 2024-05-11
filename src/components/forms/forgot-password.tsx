'use client';

import { useForm } from 'react-hook-form';

import { AlertDestructive, AlertSuccess } from '@/components/global/alerts';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { forgotPasswordAction } from '@/lib/actions/resetPasswordAction';
import { EmailSchema, type EmailSchemaType } from '@/lib/schema/reset-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import SubmitButton from './submit-button';

export default function ForgotPasswordForm() {
    const form = useForm<EmailSchemaType>({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: '',
        },
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const onSubmit = async (values: EmailSchemaType) => {
        setError(null);
        setSuccess(null);

        const result = await forgotPasswordAction(values);

        if (result?.errors) {
            const errors = result.errors.email as string[];
            form.setError('email', {
                type: 'manual',
                message: errors[0],
            });
        }

        if (!result?.success && result?.message) {
            setError(result.message);
        }

        if (result?.message && result.success) {
            setSuccess(result.message);
        }
    };

    return (
        <Form {...form}>
            <form
                // onSubmit={form.handleSubmit(onSubmit)}
                // @ts-expect-error disabled prop is not available in form
                action={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="example@availly.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && <AlertDestructive message={error} />}
                {success && <AlertSuccess message={success} />}

                <SubmitButton>Reset Password</SubmitButton>
            </form>
        </Form>
    );
}
