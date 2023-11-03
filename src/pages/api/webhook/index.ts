import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prismadb';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripeWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405).end();

    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
        console.log(`❌ Error message: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        const customer = await prisma.userSubscription.findUnique({
            where: {
                stripeCustomerId: session.customer.toString(),
            },
        });

        if (!customer) return res.status(400).end();

        await prisma.userSubscription.update({
            where: {
                stripeCustomerId: session.customer.toString(),
            },
            data: {
                active: true,
            },
        });

        return res.status(200).end();
    }

    if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object as Stripe.Subscription;

        const customer = await prisma.userSubscription.findUnique({
            where: {
                stripeCustomerId: subscription.customer.toString(),
            },
        });

        if (!customer) return res.status(400).end();

        await prisma.userSubscription.update({
            where: {
                stripeCustomerId: subscription.customer.toString(),
            },
            data: {
                active: false,
            },
        });

        return res.status(200).end();
    }

    return res.status(200).end();
};
