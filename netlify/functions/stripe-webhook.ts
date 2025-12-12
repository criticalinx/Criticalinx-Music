import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      sig!,
      webhookSecret
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;

      case 'account.updated':
        const account = stripeEvent.data.object as Stripe.Account;
        await handleAccountUpdate(account);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;

      case 'payout.paid':
      case 'payout.failed':
        const payout = stripeEvent.data.object as Stripe.Payout;
        await handlePayoutUpdate(payout);
        break;

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  console.log('Processing checkout completion:', session.id);
}

async function handleAccountUpdate(account: Stripe.Account) {
  console.log('Processing account update:', account.id);
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('Processing subscription change:', subscription.id);
}

async function handlePayoutUpdate(payout: Stripe.Payout) {
  console.log('Processing payout update:', payout.id);
}