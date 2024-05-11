import * as z from 'zod';

export const EmailSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address',
    }),
});

export const PasswordSchema = z
    .object({
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

export type EmailSchemaType = z.infer<typeof EmailSchema>;

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;
