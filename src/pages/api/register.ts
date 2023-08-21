import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { z } from 'zod';
// @ts-ignore
import { createTransport } from 'nodemailer';

import { schema } from '@/utils/registerRules';

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
