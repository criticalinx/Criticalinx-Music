export const PLATFORM_FEE_PERCENTAGE = 0.01;
export const BASIC_SUBSCRIPTION_PRICE_CENTS = 499;
export const PREMIUM_SUBSCRIPTION_PRICE_CENTS = 999;

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Stream unlimited music', 'Create playlists', 'Community features'],
  },
  basic: {
    name: 'Basic',
    price: BASIC_SUBSCRIPTION_PRICE_CENTS,
    priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID,
    features: ['Ad-free listening', 'High quality audio', 'Offline downloads', 'Early access to new releases'],
  },
  premium: {
    name: 'Premium',
    price: PREMIUM_SUBSCRIPTION_PRICE_CENTS,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
    features: ['Everything in Basic', 'Exclusive artist content', 'Priority support', 'Concert ticket discounts'],
  },
};

export function calculateRevenueSplit(amountCents: number) {
  const platformFeeCents = Math.ceil(amountCents * PLATFORM_FEE_PERCENTAGE);
  const artistRevenueCents = amountCents - platformFeeCents;

  return {
    platformFeeCents,
    artistRevenueCents,
    platformFeePercentage: PLATFORM_FEE_PERCENTAGE * 100,
    artistPercentage: (1 - PLATFORM_FEE_PERCENTAGE) * 100,
  };
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}