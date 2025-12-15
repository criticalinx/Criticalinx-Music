/*
  # Initial Music Platform Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, references auth.users)
      - `display_name` (text) - User's display name
      - `avatar_url` (text) - Profile picture URL
      - `bio` (text) - User biography
      - `is_artist` (boolean) - Whether user is an artist
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `tracks`
      - `id` (uuid, primary key)
      - `title` (text) - Track title
      - `description` (text) - Track description
      - `genre` (text) - Music genre
      - `vibe` (text) - Track vibe/mood
      - `price` (numeric) - Track price in USD
      - `file_path` (text) - Path to audio file in storage
      - `cover_image_url` (text) - Cover art URL
      - `artist_id` (uuid, references user_profiles)
      - `status` (text) - 'draft' or 'published'
      - `play_count` (integer) - Number of plays
      - `purchase_count` (integer) - Number of purchases
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `track_id` (uuid, references tracks)
      - `created_at` (timestamptz)

    - `play_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `track_id` (uuid, references tracks)
      - `played_at` (timestamptz)

    - `purchases`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `track_id` (uuid, references tracks)
      - `amount` (numeric) - Purchase amount
      - `stripe_payment_id` (text) - Stripe payment reference
      - `purchased_at` (timestamptz)

    - `comments`
      - `id` (uuid, primary key)
      - `track_id` (uuid, references tracks)
      - `user_id` (uuid, references user_profiles)
      - `content` (text) - Comment text
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to published content
    - Add policies for artists to manage their tracks

  3. Instructions
    - Go to your Supabase dashboard: https://onoizwzpuvvckjnoigtx.supabase.co
    - Navigate to the SQL Editor
    - Copy and paste this entire script
    - Click "Run" to execute
    - Then create a storage bucket named "audio" for track files (Storage > Create bucket > name: "audio", public: false)
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  bio text,
  is_artist boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create tracks table
CREATE TABLE IF NOT EXISTS tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  genre text,
  vibe text,
  price numeric DEFAULT 0.00,
  file_path text NOT NULL,
  cover_image_url text,
  artist_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  play_count integer DEFAULT 0,
  purchase_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published tracks"
  ON tracks FOR SELECT
  TO authenticated
  USING (status = 'published');

CREATE POLICY "Artists can view own tracks"
  ON tracks FOR SELECT
  TO authenticated
  USING (auth.uid() = artist_id);

CREATE POLICY "Artists can insert own tracks"
  ON tracks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = artist_id);

CREATE POLICY "Artists can update own tracks"
  ON tracks FOR UPDATE
  TO authenticated
  USING (auth.uid() = artist_id)
  WITH CHECK (auth.uid() = artist_id);

CREATE POLICY "Artists can delete own tracks"
  ON tracks FOR DELETE
  TO authenticated
  USING (auth.uid() = artist_id);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, track_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create play_history table
CREATE TABLE IF NOT EXISTS play_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE NOT NULL,
  played_at timestamptz DEFAULT now()
);

ALTER TABLE play_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own play history"
  ON play_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own play history"
  ON play_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  stripe_payment_id text,
  purchased_at timestamptz DEFAULT now(),
  UNIQUE(user_id, track_id)
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases"
  ON purchases FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own purchases"
  ON purchases FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id uuid REFERENCES tracks(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments on published tracks"
  ON comments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tracks
      WHERE tracks.id = comments.track_id
      AND tracks.status = 'published'
    )
  );

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tracks_artist_id ON tracks(artist_id);
CREATE INDEX IF NOT EXISTS idx_tracks_status ON tracks(status);
CREATE INDEX IF NOT EXISTS idx_tracks_created_at ON tracks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_track_id ON favorites(track_id);
CREATE INDEX IF NOT EXISTS idx_play_history_user_id ON play_history(user_id);
CREATE INDEX IF NOT EXISTS idx_play_history_played_at ON play_history(played_at DESC);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_track_id ON comments(track_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_user_profiles_updated_at
      BEFORE UPDATE ON user_profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_tracks_updated_at'
  ) THEN
    CREATE TRIGGER update_tracks_updated_at
      BEFORE UPDATE ON tracks
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_comments_updated_at'
  ) THEN
    CREATE TRIGGER update_comments_updated_at
      BEFORE UPDATE ON comments
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
