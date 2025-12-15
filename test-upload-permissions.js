// Diagnostic script to test upload permissions for a specific user
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://onoizwzpuvvckjnoigtx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ub2l6d3pwdXZ2Y2tqbm9pZ3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NTMyNTYsImV4cCI6MjA4MTEyOTI1Nn0.zqRxI7tLE7KqoK0BpaSRjKEBHIbOku5GOysHF_VYP4s';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUploadPermissions() {
  console.log('=== Upload Permission Diagnostic ===\n');

  // Step 1: Check if user can sign in
  console.log('1. Testing sign-in for lance.r.l@icloud.com...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'lance.r.l@icloud.com',
    password: process.argv[2] || 'test-password', // Pass password as command line arg
  });

  if (authError) {
    console.error('❌ Sign-in failed:', authError.message);
    console.log('\n💡 To test with correct password, run:');
    console.log('   node test-upload-permissions.js YOUR_PASSWORD');
    return;
  }

  console.log('✅ Sign-in successful!');
  console.log('   User ID:', authData.user.id);
  console.log('   Email:', authData.user.email);

  // Step 2: Check bucket access
  console.log('\n2. Checking bucket access...');
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

  if (bucketsError) {
    console.error('❌ Failed to list buckets:', bucketsError);
  } else {
    console.log('✅ Can access buckets:', buckets.map(b => b.name).join(', '));
    const audioBucket = buckets.find(b => b.id === 'audio');
    if (audioBucket) {
      console.log('   Audio bucket config:');
      console.log('   - Public:', audioBucket.public);
      console.log('   - File size limit:', audioBucket.file_size_limit, 'bytes');
      console.log('   - Allowed MIME types:', audioBucket.allowed_mime_types);
    }
  }

  // Step 3: Test file upload
  console.log('\n3. Testing file upload...');
  const testContent = Buffer.from('test audio content for diagnostics');
  const testFileName = `${authData.user.id}-${Date.now()}.mp3`;
  const testPath = `tracks/${testFileName}`;

  console.log('   Attempting to upload to:', testPath);

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('audio')
    .upload(testPath, testContent, {
      contentType: 'audio/mpeg',
      upsert: false
    });

  if (uploadError) {
    console.error('❌ Upload failed!');
    console.error('   Error name:', uploadError.name);
    console.error('   Error message:', uploadError.message);
    console.error('   Status code:', uploadError.statusCode || uploadError.status);
    console.error('   Full error:', JSON.stringify(uploadError, null, 2));
  } else {
    console.log('✅ Upload successful!');
    console.log('   Path:', uploadData.path);
    console.log('   Full path:', uploadData.fullPath);

    // Clean up test file
    console.log('\n4. Cleaning up test file...');
    const { error: deleteError } = await supabase.storage.from('audio').remove([testPath]);
    if (deleteError) {
      console.error('❌ Failed to delete test file:', deleteError);
    } else {
      console.log('✅ Test file cleaned up');
    }
  }

  // Step 4: Check tracks table permissions
  console.log('\n5. Testing tracks table insert permissions...');
  const { data: insertData, error: insertError } = await supabase
    .from('tracks')
    .insert({
      title: 'Test Track',
      description: 'Test description',
      genre: 'pop',
      vibe: 'chill',
      price: 0.00,
      file_path: 'tracks/test.mp3',
      artist_id: authData.user.id,
      status: 'draft',
    })
    .select();

  if (insertError) {
    console.error('❌ Failed to insert into tracks table:', insertError.message);
  } else {
    console.log('✅ Successfully inserted test track');
    console.log('   Track ID:', insertData[0].id);

    // Clean up test track
    await supabase.from('tracks').delete().eq('id', insertData[0].id);
    console.log('✅ Test track cleaned up');
  }

  console.log('\n=== Diagnostic Complete ===');
}

testUploadPermissions().catch(console.error);
