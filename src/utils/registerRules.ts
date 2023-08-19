import { z } from 'zod';

export const schema = z.object({
    email: z.string().email(),
    username: z
        .string()
        .min(3, { message: 'Username must have minumum 3 letters' })
        .regex(/^[a-zA-Z0-9_.]+$/, {
            message:
                'Username can only contain alphanumeric characters, underscore and dot',
        }), // alphanumeric, underscore, dot
    name: z.string(),
    password: z
        .string()
        .min(6)
        .refine((value) => {
            // Password strength criteria
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSpecialCharacter = /[!@#$%^&*]/.test(value);
            return (
                hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter
            );
        }, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});
