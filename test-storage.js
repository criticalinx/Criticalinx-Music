// Test script to diagnose storage issues
// Run this with: node test-storage.js

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://onoizwzpuvvckjnoigtx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ub2l6d3pwdXZ2Y2tqbm9pZ3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NTMyNTYsImV4cCI6MjA4MTEyOTI1Nn0.zqRxI7tLE7KqoK0BpaSRjKEBHIbOku5GOysHF_VYP4s'
);

async function testStorage() {
  console.log('Testing Supabase Storage...\n');

  // Test 1: List buckets
  console.log('1. Listing buckets:');
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  if (bucketsError) {
    console.error('Error listing buckets:', bucketsError);
  } else {
    console.log('Buckets found:', buckets.map(b => b.name));
  }

  // Test 2: Get bucket details
  console.log('\n2. Getting audio bucket details:');
  const { data: bucket, error: bucketError } = await supabase.storage.getBucket('audio');
  if (bucketError) {
    console.error('Error getting audio bucket:', bucketError);
  } else {
    console.log('Audio bucket:', bucket);
  }

  // Test 3: List files in audio bucket
  console.log('\n3. Listing files in audio/tracks:');
  const { data: files, error: filesError } = await supabase.storage
    .from('audio')
    .list('tracks', { limit: 10 });
  if (filesError) {
    console.error('Error listing files:', filesError);
  } else {
    console.log('Files found:', files?.length || 0);
  }
}

testStorage().catch(console.error);
