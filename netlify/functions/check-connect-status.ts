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
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const authHeader = event.headers.authorization;
  if (!authHeader) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return { statusCode: 401, body: 'Unauthorized' };
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('stripe_connect_account_id, stripe_onboarding_complete')
      .eq('id', user.id)
      .single();

    if (!profile?.stripe_connect_account_id) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          onboardingComplete: false,
          detailsSubmitted: false,
          chargesEnabled: false,
          payoutsEnabled: false,
        }),
      };
    }

    const account = await stripe.accounts.retrieve(profile.stripe_connect_account_id);

    const onboardingComplete = account.details_submitted && account.charges_enabled && account.payouts_enabled;

    if (onboardingComplete && !profile.stripe_onboarding_complete) {
      await supabase
        .from('user_profiles')
        .update({ stripe_onboarding_complete: true })
        .eq('id', user.id);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        onboardingComplete,
        detailsSubmitted: account.details_submitted,
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        accountId: account.id,
      }),
    };
  } catch (error: any) {
    console.error('Error checking Connect status:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
