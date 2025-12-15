/*
  # Storage Configuration for Audio Uploads

  This script creates and configures the audio storage bucket with proper policies
  for authenticated users to upload tracks.

  Run this in your Supabase SQL Editor:
  https://onoizwzpuvvckjnoigtx.supabase.co
*/

-- Create the audio storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('audio', 'audio', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for uploads

-- Policy: Allow authenticated users to upload their own files
CREATE POLICY "Users can upload their own audio files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'audio'
  AND (storage.foldername(name))[1] = 'tracks'
  AND auth.uid()::text = (string_to_array(name, '-'))[1]
);

-- Policy: Allow authenticated users to read audio files
CREATE POLICY "Authenticated users can read audio files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'audio');

-- Policy: Allow users to update their own files
CREATE POLICY "Users can update their own audio files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'audio'
  AND auth.uid()::text = (string_to_array(name, '-'))[1]
)
WITH CHECK (
  bucket_id = 'audio'
  AND auth.uid()::text = (string_to_array(name, '-'))[1]
);

-- Policy: Allow users to delete their own files
CREATE POLICY "Users can delete their own audio files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'audio'
  AND auth.uid()::text = (string_to_array(name, '-'))[1]
);
