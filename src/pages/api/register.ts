import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { z } from 'zod';
// @ts-ignore
import { createTransport } from 'nodemailer';

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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { email, username, name, password } = schema.parse(req.body);

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword,
            },
        });

        // welcome email
        const transporter = createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT),
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Welcome to NextAuth.js',
            text: 'Welcome to NextAuth.js',
            html: `<h1>Welcome to NextAuth.js</h1><p>You have successfully signed up to NextAuth.js!</p>`,
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
