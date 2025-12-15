# Artist Payment System Setup Guide

This guide explains how the artist profile and payment system works and how to set it up.

## Overview

The artist payment system uses Stripe Connect to handle payouts to artists. Artists receive **99% of all sales**, with the platform taking a 1% fee.

## How It Works

### 1. User Signup
- Users sign up via `/auth/signup` with email and password
- A `user_profiles` entry is automatically created via database trigger
- Initial profile uses email username as display name
- `is_artist` defaults to `false`

### 2. Artist Onboarding
- Artists visit `/artists/onboarding` to become creators
- **Step 1: Profile Setup**
  - Enter artist name, genre, and bio
  - Data is saved when proceeding to payment setup

- **Step 2: Stripe Connect**
  - System creates Stripe Connect Express account
  - Redirects to Stripe for KYC/onboarding
  - Stripe collects tax info, bank details, identity verification
  - Returns to app when complete

- **Step 3: Completion**
  - Once Stripe onboarding is complete, artist can upload tracks
  - `stripe_onboarding_complete` flag set to `true`

### 3. Revenue Tracking
- When a user purchases a track, the `purchases` table is updated
- Database trigger automatically calculates artist revenue (99%)
- Revenue is added to `artist_revenue_cents` in `user_profiles`
- Platform can create payouts from accumulated revenue

### 4. Payouts
- `payouts` table tracks payments to artists
- Webhook updates payout status when Stripe processes transfers
- Artists can view payout history (future feature)

## Database Schema

### New Fields on `user_profiles`
- `stripe_connect_account_id` - Stripe Connect account ID
- `stripe_onboarding_complete` - Whether onboarding is done
- `artist_revenue_cents` - Total accumulated revenue

### New Table: `payouts`
```sql
- id (uuid)
- artist_id (references user_profiles)
- amount_cents (integer)
- stripe_payout_id (text)
- status ('pending', 'paid', 'failed')
- period_start (timestamptz)
- period_end (timestamptz)
- created_at (timestamptz)
- paid_at (timestamptz)
```

## Setup Instructions

### 1. Apply Database Migration

Run the migration file in your Supabase SQL editor:
```bash
migrations/add_artist_payment_infrastructure.sql
```

This will:
- Add new columns to `user_profiles`
- Create `payouts` table
- Set up auto-profile creation trigger
- Create revenue tracking trigger

### 2. Configure Stripe

1. **Get Stripe Keys:**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com)
   - Navigate to Developers > API keys
   - Copy your Secret Key and Publishable Key

2. **Enable Stripe Connect:**
   - In Stripe Dashboard, go to Connect > Settings
   - Enable Express accounts
   - Configure your Connect branding

3. **Set up Webhook:**
   - Go to Developers > Webhooks
   - Add endpoint: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
   - Select these events:
     - `account.updated`
     - `checkout.session.completed`
     - `customer.subscription.*`
     - `payout.paid`
     - `payout.failed`
   - Copy the webhook signing secret

### 3. Update Environment Variables

Add to your `.env` file:
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

For Netlify deployment, add these in:
- Netlify Dashboard > Site settings > Environment variables

### 4. Test the Flow

1. **Create a test user:**
   - Sign up at `/auth/signup`
   - Check that `user_profiles` entry was auto-created

2. **Complete artist onboarding:**
   - Visit `/artists/onboarding`
   - Fill in profile details
   - Click "Connect Stripe Account"
   - Complete Stripe onboarding (use test mode)
   - Should redirect back with success

3. **Verify status:**
   - Check `user_profiles` table
   - Should see `stripe_connect_account_id` populated
   - `stripe_onboarding_complete` should be `true`
   - `is_artist` should be `true`

4. **Test upload:**
   - Visit `/upload`
   - Upload a track
   - Set a price
   - Publish

## API Endpoints

### Create Connect Account
- **URL:** `/.netlify/functions/create-connect-account`
- **Method:** POST
- **Auth:** Required (Bearer token)
- **Body:**
  ```json
  {
    "artistName": "Artist Name",
    "genre": "Pop",
    "bio": "Biography",
    "email": "artist@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "url": "https://connect.stripe.com/...",
    "accountId": "acct_..."
  }
  ```

### Check Connect Status
- **URL:** `/.netlify/functions/check-connect-status`
- **Method:** GET
- **Auth:** Required (Bearer token)
- **Response:**
  ```json
  {
    "onboardingComplete": true,
    "detailsSubmitted": true,
    "chargesEnabled": true,
    "payoutsEnabled": true,
    "accountId": "acct_..."
  }
  ```

## Revenue Split

- **Track Price:** $10.00
- **Platform Fee (1%):** $0.10
- **Artist Revenue (99%):** $9.90

The split is automatically calculated by the `update_artist_revenue()` database function.

## Webhook Events Handled

- `account.updated` - Updates artist onboarding status
- `payout.paid` - Marks payout as successful
- `payout.failed` - Marks payout as failed
- `checkout.session.completed` - (Future: handle track purchases)
- `customer.subscription.*` - (Future: handle subscriptions)

## Security

- RLS policies ensure artists only see their own payouts
- Service role key used in server functions for admin operations
- Stripe webhook signature verification prevents fraud
- Artist revenue calculations happen server-side in database

## Troubleshooting

**Issue: Profile not created on signup**
- Check that migration was applied
- Verify trigger `on_auth_user_created` exists
- Check Supabase logs for errors

**Issue: Stripe Connect redirect fails**
- Verify STRIPE_SECRET_KEY is set
- Check that Netlify function is deployed
- Review function logs in Netlify

**Issue: Webhook not updating status**
- Confirm webhook endpoint is correct
- Verify STRIPE_WEBHOOK_SECRET matches Stripe dashboard
- Check webhook delivery in Stripe dashboard
- Review Netlify function logs

## Next Steps

Future enhancements to consider:
1. Artist dashboard showing earnings
2. Payout request system
3. Automated weekly/monthly payouts
4. Sales analytics
5. Tax document generation
6. Multi-currency support
