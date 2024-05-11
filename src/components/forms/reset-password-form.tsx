'use client';

import { useForm } from 'react-hook-form';

import { AlertDestructive, AlertSuccess } from '@/components/global/alerts';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { resetPasswordAction } from '@/lib/actions/resetPasswordAction';
import {
    PasswordSchema,
    type PasswordSchemaType,
} from '@/lib/schema/reset-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import SubmitButton from './submit-button';

export default function ResetPasswordForm({ token }: { token: string }) {
    const form = useForm<PasswordSchemaType>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = (isChecked: boolean) => {
        setShowPassword(isChecked);
    };

    const onSubmit = async (values: PasswordSchemaType) => {
        setError(null);
        setSuccess(null);
        const data = {
            ...values,
            token,
        };

        const result = await resetPasswordAction(data);

        if (result?.errors) {
            result.errors.map((error) => {
                form.setError(error.field as keyof PasswordSchemaType, {
                    type: 'manual',
                    message: error.message,
                });
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="items-top flex space-x-2">
                    <Checkbox
                        id="showpassword"
                        onCheckedChange={toggleShowPassword}
                    />
                    <label
                        htmlFor="showpassword"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Show Password
                    </label>
                </div>

                {error && <AlertDestructive message={error} />}
                {success && <AlertSuccess message={success} />}

                <SubmitButton>Reset Password</SubmitButton>
            </form>
        </Form>
    );
}
