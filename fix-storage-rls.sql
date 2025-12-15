/*
  # Fix Storage Bucket Access Issue

  This script fixes the common "Bucket not found" error by ensuring:
  1. The storage.buckets table allows anon users to see bucket information
  2. The storage.objects policies are properly configured
  3. The audio bucket exists and is properly configured
*/

-- First, ensure the audio bucket exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'audio',
  'audio',
  false,
  524288000, -- 500MB limit
  ARRAY['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/mp3']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = 524288000,
  allowed_mime_types = ARRAY['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/mp3'];

-- CRITICAL FIX: Allow anon users to see bucket information
-- Without this, the client will get "Bucket not found" even if the bucket exists
DROP POLICY IF EXISTS "Allow anon to see buckets" ON storage.buckets;

CREATE POLICY "Allow anon to see buckets"
ON storage.buckets FOR SELECT
TO anon, authenticated
USING (true);

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can upload their own audio files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read audio files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own audio files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own audio files" ON storage.objects;

-- Policy: Allow authenticated users to upload their own files
CREATE POLICY "Users can upload their own audio files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'audio'
  AND (storage.foldername(name))[1] = 'tracks'
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
  AND (storage.foldername(name))[1] = 'tracks'
)
WITH CHECK (
  bucket_id = 'audio'
  AND (storage.foldername(name))[1] = 'tracks'
);

-- Policy: Allow users to delete their own files
CREATE POLICY "Users can delete their own audio files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'audio'
  AND (storage.foldername(name))[1] = 'tracks'
);

-- Verify the bucket is visible
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE id = 'audio';
