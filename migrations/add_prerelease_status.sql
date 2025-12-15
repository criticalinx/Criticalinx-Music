/*
  # Add Pre-Release Status to Tracks

  ## 1. Changes to Existing Tables

  ### `tracks` table modifications
  - Update status constraint to include 'pre-release' as a valid option
  - Status options: 'draft', 'pre-release', 'published'

  ## 2. Security Updates

  ### Updated RLS Policies
  - Allow public (authenticated) users to view pre-release tracks
  - Allow artists to view comments and discussions on their pre-release tracks
  - Enable discussions and comments on pre-release tracks

  ## 3. Important Notes
  - Pre-release tracks are visible to all authenticated users (for feedback)
  - Artists can share pre-release tracks to get feedback before full publication
  - Artists maintain full control over their pre-release tracks
*/

-- Drop the existing constraint and add a new one with pre-release status
DO $$
BEGIN
  -- Drop the existing check constraint if it exists
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'tracks_status_check'
  ) THEN
    ALTER TABLE tracks DROP CONSTRAINT tracks_status_check;
  END IF;

  -- Add the new constraint with pre-release status
  ALTER TABLE tracks ADD CONSTRAINT tracks_status_check
    CHECK (status IN ('draft', 'pre-release', 'published'));
END $$;

-- Update policy to allow viewing pre-release tracks
DROP POLICY IF EXISTS "Anyone can view published tracks" ON tracks;

CREATE POLICY "Anyone can view published and pre-release tracks"
  ON tracks FOR SELECT
  TO authenticated
  USING (status = 'published' OR status = 'pre-release');

-- Update comments policy to allow viewing comments on pre-release tracks
DROP POLICY IF EXISTS "Anyone can view comments on published tracks" ON comments;

CREATE POLICY "Anyone can view comments on published and pre-release tracks"
  ON comments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tracks
      WHERE tracks.id = comments.track_id
      AND (tracks.status = 'published' OR tracks.status = 'pre-release')
    )
  );

-- Update comments insert policy to allow comments on pre-release tracks
DROP POLICY IF EXISTS "Users can create comments" ON comments;

CREATE POLICY "Users can create comments on published and pre-release tracks"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM tracks
      WHERE tracks.id = comments.track_id
      AND (tracks.status = 'published' OR tracks.status = 'pre-release')
    )
  );

-- Update song_discussions policy to allow viewing discussions on pre-release tracks
DROP POLICY IF EXISTS "Anyone can view discussions on published tracks" ON song_discussions;

CREATE POLICY "Anyone can view discussions on published and pre-release tracks"
  ON song_discussions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tracks
      WHERE tracks.id = song_discussions.track_id
      AND (tracks.status = 'published' OR tracks.status = 'pre-release')
    )
  );

-- Update song_discussions insert policy to allow discussions on pre-release tracks
DROP POLICY IF EXISTS "Authenticated users can create discussions" ON song_discussions;

CREATE POLICY "Authenticated users can create discussions on published and pre-release tracks"
  ON song_discussions FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM tracks
      WHERE tracks.id = song_discussions.track_id
      AND (tracks.status = 'published' OR tracks.status = 'pre-release')
    )
  );

-- Add artist policy to view comments on their own tracks (including drafts)
CREATE POLICY "Artists can view comments on own tracks"
  ON comments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tracks
      WHERE tracks.id = comments.track_id
      AND tracks.artist_id = auth.uid()
    )
  );

-- Add artist policy to view discussions on their own tracks (including drafts)
CREATE POLICY "Artists can view discussions on own tracks"
  ON song_discussions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tracks
      WHERE tracks.id = song_discussions.track_id
      AND tracks.artist_id = auth.uid()
    )
  );
