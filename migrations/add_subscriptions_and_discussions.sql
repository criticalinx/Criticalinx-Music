/*
  # Add Subscriptions and Discussion Features

  ## 1. New Tables

  ### `subscriptions`
  - `id` (uuid, primary key) - Unique subscription identifier
  - `user_id` (uuid, foreign key) - References auth.users
  - `stripe_subscription_id` (text) - Stripe subscription ID
  - `stripe_customer_id` (text) - Stripe customer ID
  - `plan_type` (text) - Type of subscription plan (free, basic, premium)
  - `status` (text) - Subscription status (active, canceled, past_due, inactive)
  - `current_period_start` (timestamptz) - Start of current billing period
  - `current_period_end` (timestamptz) - End of current billing period
  - `cancel_at_period_end` (boolean) - Whether subscription cancels at period end
  - `created_at` (timestamptz) - When subscription was created
  - `updated_at` (timestamptz) - When subscription was last updated

  ### `song_discussions`
  - `id` (uuid, primary key) - Unique discussion identifier
  - `track_id` (uuid, foreign key) - References tracks table
  - `user_id` (uuid, foreign key) - References user_profiles
  - `message` (text) - Discussion message content
  - `parent_id` (uuid, nullable) - For threaded replies
  - `created_at` (timestamptz) - When message was posted
  - `updated_at` (timestamptz) - When message was last edited

  ### `discussion_reactions`
  - `id` (uuid, primary key) - Unique reaction identifier
  - `discussion_id` (uuid, foreign key) - References song_discussions
  - `user_id` (uuid, foreign key) - References user_profiles
  - `reaction_type` (text) - Type of reaction (like, love, fire)
  - `created_at` (timestamptz) - When reaction was added

  ## 2. Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their own subscriptions
  - Add policies for authenticated users to post and view discussions
  - Add policies for authenticated users to add reactions

  ## 3. Instructions
  - Go to your Supabase dashboard: https://onoizwzpuvvckjnoigtx.supabase.co
  - Navigate to the SQL Editor
  - Copy and paste this entire script
  - Click "Run" to execute
*/

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id text UNIQUE,
  stripe_customer_id text,
  plan_type text NOT NULL DEFAULT 'free',
  status text NOT NULL DEFAULT 'inactive',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, plan_type)
);

-- Create song_discussions table
CREATE TABLE IF NOT EXISTS song_discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  parent_id uuid REFERENCES song_discussions(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create discussion_reactions table
CREATE TABLE IF NOT EXISTS discussion_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid REFERENCES song_discussions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  reaction_type text NOT NULL DEFAULT 'like',
  created_at timestamptz DEFAULT now(),
  UNIQUE(discussion_id, user_id, reaction_type)
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE song_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_reactions ENABLE ROW LEVEL SECURITY;

-- Subscriptions policies
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Song discussions policies
CREATE POLICY "Anyone can view discussions on published tracks"
  ON song_discussions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tracks
      WHERE tracks.id = song_discussions.track_id
      AND tracks.status = 'published'
    )
  );

CREATE POLICY "Authenticated users can create discussions"
  ON song_discussions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own discussions"
  ON song_discussions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own discussions"
  ON song_discussions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Discussion reactions policies
CREATE POLICY "Anyone can view reactions"
  ON discussion_reactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can add reactions"
  ON discussion_reactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reactions"
  ON discussion_reactions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_song_discussions_track_id ON song_discussions(track_id);
CREATE INDEX IF NOT EXISTS idx_song_discussions_user_id ON song_discussions(user_id);
CREATE INDEX IF NOT EXISTS idx_song_discussions_parent_id ON song_discussions(parent_id);
CREATE INDEX IF NOT EXISTS idx_song_discussions_created_at ON song_discussions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_discussion_reactions_discussion_id ON discussion_reactions(discussion_id);
CREATE INDEX IF NOT EXISTS idx_discussion_reactions_user_id ON discussion_reactions(user_id);

-- Add triggers for updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_subscriptions_updated_at'
  ) THEN
    CREATE TRIGGER update_subscriptions_updated_at
      BEFORE UPDATE ON subscriptions
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_song_discussions_updated_at'
  ) THEN
    CREATE TRIGGER update_song_discussions_updated_at
      BEFORE UPDATE ON song_discussions
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
