/*
  Sample Songs Script

  Instructions:
  1. First, sign up or log in to your app to create a user account
  2. Go to Supabase Dashboard > SQL Editor
  3. Replace 'YOUR_USER_ID_HERE' below with your actual user ID
     - To find your user ID: Go to Authentication > Users in Supabase Dashboard
     - Or run: SELECT id FROM auth.users WHERE email = 'your@email.com';
  4. Run this script to add 10 sample songs

  Note: The file_path values are placeholders. You'll need to:
  - Upload actual audio files through your app's upload page, OR
  - Manually upload files to Supabase Storage 'audio' bucket and update these paths
*/

-- First, make sure you have a user profile
-- Replace 'YOUR_USER_ID_HERE' with your actual user ID from auth.users table
INSERT INTO user_profiles (id, display_name, is_artist, bio)
VALUES (
  'YOUR_USER_ID_HERE', -- Replace this!
  'DJ Sunshine',
  true,
  'Creating uplifting vibes and positive energy through music'
)
ON CONFLICT (id) DO UPDATE SET
  is_artist = true,
  display_name = 'DJ Sunshine';

-- Insert 10 sample tracks
-- Note: You'll need to upload actual audio files or these tracks won't play
INSERT INTO tracks (
  title,
  description,
  genre,
  vibe,
  price,
  file_path,
  cover_image_url,
  artist_id,
  status,
  play_count
) VALUES
(
  'Morning Sunshine',
  'Start your day with positive energy and uplifting melodies',
  'Electronic',
  'Uplifting',
  2.99,
  'audio/morning-sunshine.mp3', -- Placeholder - upload real file
  'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
  'YOUR_USER_ID_HERE', -- Replace this!
  'published',
  15420
),
(
  'Rise and Shine',
  'Feel the warmth of a new day with this energetic track',
  'Pop',
  'Happy',
  1.99,
  'audio/rise-and-shine.mp3',
  'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=800',
  'YOUR_USER_ID_HERE',
  'published',
  12890
),
(
  'Ocean Breeze',
  'Calm and soothing sounds inspired by the sea',
  'Ambient',
  'Calm',
  2.49,
  'audio/ocean-breeze.mp3',
  'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800',
  'YOUR_USER_ID_HERE',
  'published',
  8750
),
(
  'Digital Dreams',
  'Journey through a world of electronic soundscapes',
  'Electronic',
  'Dreamy',
  3.49,
  'audio/digital-dreams.mp3',
  'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
  'YOUR_USER_ID_HERE',
  'published',
  21340
),
(
  'Summer Vibes',
  'Feel the heat with this summer anthem',
  'Dance',
  'Energetic',
  2.99,
  'audio/summer-vibes.mp3',
  'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800',
  'YOUR_USER_ID_HERE',
  'published',
  18920
),
(
  'Peaceful Mind',
  'Meditation music for inner peace and tranquility',
  'Ambient',
  'Peaceful',
  1.99,
  'audio/peaceful-mind.mp3',
  'https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&cs=tinysrgb&w=800',
  'YOUR_USER_ID_HERE',
  'published',
  9560
),
(
  'City Lights',
  'Urban beats mixed with melodic elements',
  'Hip Hop',
  'Urban',
  2.49,
  'audio/city-lights.mp3',
  'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800',
  'YOUR_USER_ID_HERE',
  'published',
  14230
),
(
  'Golden Hour',
  'Warm, nostalgic sounds perfect for sunset moments',
  'Indie',
  'Nostalgic',
  2.99,
  'audio/golden-hour.mp3',
  'https://images.pexels.com/photos/210887/pexels-photo-210887.jpeg?auto=compress&cs=tinysrgb&w=800',
  'YOUR_USER_ID_HERE',
  'published',
  16780
),
(
  'Cosmic Journey',
  'Travel through space with ethereal soundscapes',
  'Ambient',
  'Ethereal',
  3.99,
  'audio/cosmic-journey.mp3',
  'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
  'YOUR_USER_ID_HERE',
  'published',
  11290
),
(
  'Fresh Start',
  'Motivational music to kickstart your goals',
  'Pop',
  'Motivational',
  2.49,
  'audio/fresh-start.mp3',
  'https://images.pexels.com/photos/1089842/pexels-photo-1089842.jpeg?auto=compress&cs=tinysrgb&w=800',
  'YOUR_USER_ID_HERE',
  'published',
  13450
);
