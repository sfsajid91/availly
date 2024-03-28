import * as z from 'zod';

export const SignupSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(3, { message: 'Name must be at least 3 characters long' })
            .max(50, { message: 'Name must be less than 50 characters long' })
            .regex(/^[A-Za-z\s]+$/, {
                message: 'Name can only contain letters and whitespace',
            }),
        email: z.string().email({
            message: 'Please enter a valid email address',
        }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' }),

        confirmPassword: z.string(),
    })
    .superRefine((values, ctx) => {
        if (values.password !== values.confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match',
                path: ['confirmPassword'], // Highlight the problematic field
            });
        }
    });

export type SignupSchemaType = z.infer<typeof SignupSchema>;
