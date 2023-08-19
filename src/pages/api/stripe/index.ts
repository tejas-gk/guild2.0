import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { currentUser } = await serverAuth(req, res);

        const { id } = req.body;

        const customer = await prisma.userSubscription.findUnique({
            where: {
                id: currentUser.id,
            },
        });

        if (customer && customer.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: customer.stripeCustomerId,
                return_url: `${process.env.NEXT_LOCAL_URL}/settings`,
            });

            res.status(200).json({ url: stripeSession.url });
        }

        const stripeCustomer = await stripe.checkout.sessions.create({
            customer_email: currentUser.email,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: `${process.env.NEXT_LOCAL_URL}/settings`,
            cancel_url: `${process.env.NEXT_LOCAL_URL}/settings`,
            metadata: {
                userId: currentUser.id,
            },
        });

        await prisma.userSubscription.update({
            where: {
                id: currentUser.id,
            },
            data: {
                stripeCustomerId: stripeCustomer.customer.toString(),
            },
        });

        res.status(200).json({ url: stripeCustomer.url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
