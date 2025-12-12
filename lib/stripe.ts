export const PLATFORM_FEE_PERCENTAGE = 0.01;
export const PREMIUM_SUBSCRIPTION_PRICE_CENTS = 500;

export function calculateRevenueSplit(amountCents: number) {
  const platformFeeCents = Math.ceil(amountCents * PLATFORM_FEE_PERCENTAGE);
  const artistRevenueCents = amountCents - platformFeeCents;

  return {
    platformFeeCents,
    artistRevenueCents,
  };
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}