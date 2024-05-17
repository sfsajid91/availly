'use client';

import { useForm } from 'react-hook-form';

import { AlertDestructive } from '@/components/global/alerts';
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
import { loginAction } from '@/lib/actions/loginAction';
import { LoginSchema, type LoginSchemaType } from '@/lib/schema/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SubmitButton from './submit-button';

export default function LoginForm() {
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get('error')) {
            switch (searchParams.get('error')) {
                case 'CredentialsSignin':
                    setError('Invalid credentials.');
                    break;
                case 'AuthorizedCallbackError':
                    setError('Email not verified.');
                    break;
                default:
                    setError('Something went wrong.');
                    break;
            }
        }
    }, [searchParams]);

    const toggleShowPassword = (isChecked: boolean) => {
        setShowPassword(isChecked);
    };

    const onSubmit = async (values: LoginSchemaType) => {
        const result = await loginAction(values);

        if (result?.errors) {
            result.errors.forEach((error) => {
                form.setError(error.field as keyof LoginSchemaType, {
                    type: 'manual',
                    message: error.message,
                });
            });
        }
    };

    return (
        <>
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

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
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

                    <SubmitButton>Login</SubmitButton>
                </form>
            </Form>

            {/* forgot password */}
            <div className="flex items-center justify-between py-4">
                <p className="text-sm font-medium text-slate-500">
                    Forgot Password?
                </p>

                <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Reset
                </Link>
            </div>
        </>
    );
}
