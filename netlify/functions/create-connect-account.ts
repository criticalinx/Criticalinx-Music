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

    const { artistName, genre, bio, email } = JSON.parse(event.body || '{}');

    if (!artistName || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('stripe_connect_account_id')
      .eq('id', user.id)
      .single();

    let accountId = profile?.stripe_connect_account_id;

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'US',
        email: email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_type: 'individual',
        metadata: {
          user_id: user.id,
          artist_name: artistName,
        },
      });

      accountId = account.id;

      await supabase
        .from('user_profiles')
        .update({
          stripe_connect_account_id: accountId,
          display_name: artistName,
          bio: bio || null,
          is_artist: true,
        })
        .eq('id', user.id);
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.URL || 'http://localhost:8888'}/artists/onboarding?refresh=true`,
      return_url: `${process.env.URL || 'http://localhost:8888'}/artists/onboarding?success=true`,
      type: 'account_onboarding',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: accountLink.url,
        accountId: accountId,
      }),
    };
  } catch (error: any) {
    console.error('Error creating Connect account:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
