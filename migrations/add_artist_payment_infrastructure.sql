/*
  # Add Artist Payment Infrastructure

  1. Schema Changes
    - Add `stripe_connect_account_id` to user_profiles
    - Add `stripe_onboarding_complete` boolean to track Stripe Connect status
    - Add `artist_revenue_cents` to track total earnings

  2. New Tables
    - `payouts`
      - `id` (uuid, primary key)
      - `artist_id` (uuid, references user_profiles)
      - `amount_cents` (integer) - Payout amount in cents
      - `stripe_payout_id` (text) - Stripe payout reference
      - `status` (text) - 'pending', 'paid', 'failed'
      - `period_start` (timestamptz) - Period start date
      - `period_end` (timestamptz) - Period end date
      - `created_at` (timestamptz)
      - `paid_at` (timestamptz)

  3. Functions
    - Create trigger to auto-create user_profiles when auth.users is created
    - Create function to update artist revenue

  4. Security
    - Enable RLS on payouts table
    - Add policies for artists to view their own payouts
*/

-- Add Stripe Connect fields to user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'stripe_connect_account_id'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN stripe_connect_account_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'stripe_onboarding_complete'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN stripe_onboarding_complete boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'artist_revenue_cents'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN artist_revenue_cents integer DEFAULT 0;
  END IF;
END $$;

-- Create payouts table
CREATE TABLE IF NOT EXISTS payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  amount_cents integer NOT NULL,
  stripe_payout_id text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  paid_at timestamptz
);

ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artists can view own payouts"
  ON payouts FOR SELECT
  TO authenticated
  USING (auth.uid() = artist_id);

-- Create index for payouts
CREATE INDEX IF NOT EXISTS idx_payouts_artist_id ON payouts(artist_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON payouts(status);
CREATE INDEX IF NOT EXISTS idx_payouts_created_at ON payouts(created_at DESC);

-- Function to auto-create user_profiles when a user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, display_name, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    now(),
    now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for auto-creating user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION handle_new_user();
  END IF;
END $$;

-- Function to update artist revenue after purchase
CREATE OR REPLACE FUNCTION update_artist_revenue()
RETURNS TRIGGER AS $$
DECLARE
  artist_share_cents integer;
BEGIN
  -- Calculate 99% for artist (1% platform fee)
  artist_share_cents := FLOOR((NEW.amount * 100) * 0.99);

  -- Update artist's total revenue
  UPDATE user_profiles
  SET artist_revenue_cents = COALESCE(artist_revenue_cents, 0) + artist_share_cents
  WHERE id = (
    SELECT artist_id FROM tracks WHERE id = NEW.track_id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updating artist revenue on purchase
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_purchase_created'
  ) THEN
    CREATE TRIGGER on_purchase_created
      AFTER INSERT ON purchases
      FOR EACH ROW
      EXECUTE FUNCTION update_artist_revenue();
  END IF;
END $$;
