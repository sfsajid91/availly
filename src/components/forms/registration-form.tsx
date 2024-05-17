'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { signupAction } from '@/lib/actions/signupAction';
import {
    SignupSchema,
    type SignupSchemaType,
} from '@/lib/schema/signup-schema';
import Link from 'next/link';
import { useState } from 'react';
import SubmitButton from './submit-button';

type Message = {
    message: string;
    success: boolean | undefined;
};

export default function RegistrationForm() {
    const form = useForm<SignupSchemaType>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState<Message>({
        message: '',
        success: undefined,
    });

    const toggleShowPassword = (isChecked: boolean) => {
        setShowPassword(isChecked);
    };

    const onSubmit = async (values: SignupSchemaType) => {
        setMessage({
            message: '',
            success: undefined,
        });

        const result = await signupAction(values);

        if (!result?.success && result.message) {
            setMessage({
                message: result?.message,
                success: false,
            });
        }

        if (result.success && result.message) {
            setMessage({
                message: result?.message,
                success: true,
            });
        }

        if (result?.errors) {
            result.errors.map((error) => {
                form.setError(error.field as keyof SignupSchemaType, {
                    type: 'manual',
                    message: error.message,
                });
            });
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fullname</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                        // checked={showPassword}
                        onCheckedChange={toggleShowPassword}
                    />
                    <label
                        htmlFor="showpassword"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Show Password
                    </label>
                </div>

                <p className="text-sm text-gray-500">
                    By clicking Register, you agree to our{' '}
                    <Link
                        href="/terms-of-service"
                        className="font-medium text-gray-900 underline"
                    >
                        Terms of Service
                    </Link>
                    .
                </p>

                {message.success && <AlertSuccess message={message.message} />}

                {message.success === false && (
                    <AlertDestructive message={message.message} />
                )}

                <SubmitButton>Register</SubmitButton>
            </form>
        </Form>
    );
}
