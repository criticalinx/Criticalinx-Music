import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

  const onboardingComplete = account.details_submitted && account.charges_enabled && account.payouts_enabled;

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('stripe_connect_account_id', account.id)
    .single();

  if (profile) {
    await supabase
      .from('user_profiles')
      .update({
        stripe_onboarding_complete: onboardingComplete,
      })
      .eq('id', profile.id);

    console.log(`Updated onboarding status for user ${profile.id}: ${onboardingComplete}`);
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('Processing subscription change:', subscription.id);
}

async function handlePayoutUpdate(payout: Stripe.Payout) {
  console.log('Processing payout update:', payout.id);

  const status = payout.status === 'paid' ? 'paid' : payout.status === 'failed' ? 'failed' : 'pending';

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('stripe_connect_account_id', payout.destination)
    .single();

  if (profile) {
    const { error } = await supabase
      .from('payouts')
      .update({
        status,
        paid_at: payout.status === 'paid' ? new Date(payout.arrival_date * 1000).toISOString() : null,
        stripe_payout_id: payout.id,
      })
      .eq('stripe_payout_id', payout.id);

    if (error) {
      console.error('Error updating payout:', error);
    } else {
      console.log(`Updated payout ${payout.id} to status: ${status}`);
    }
  }
}