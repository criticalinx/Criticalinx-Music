'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function DebugUploadPage() {
  const [checks, setChecks] = useState<Record<string, { status: 'pending' | 'success' | 'error', message: string }>>({
    auth: { status: 'pending', message: 'Checking authentication...' },
    profile: { status: 'pending', message: 'Checking user profile...' },
    bucket: { status: 'pending', message: 'Checking storage bucket...' },
    upload: { status: 'pending', message: 'Testing upload permissions...' },
  });

  const updateCheck = (key: string, status: 'success' | 'error', message: string) => {
    setChecks(prev => ({ ...prev, [key]: { status, message } }));
  };

  const runDiagnostics = async () => {
    // Reset checks
    setChecks({
      auth: { status: 'pending', message: 'Checking authentication...' },
      profile: { status: 'pending', message: 'Checking user profile...' },
      bucket: { status: 'pending', message: 'Checking storage bucket...' },
      upload: { status: 'pending', message: 'Testing upload permissions...' },
    });

    // Check 1: Authentication
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (!user) {
        updateCheck('auth', 'error', 'Not signed in. Please sign in first.');
        return;
      }
      updateCheck('auth', 'success', `Signed in as: ${user.email}`);

      // Check 2: User Profile
      try {
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) throw profileError;
        if (!profile) {
          updateCheck('profile', 'error', 'User profile not found. Creating one may help.');

          // Try to create profile
          const { error: insertError } = await supabase
            .from('user_profiles')
            .insert({ id: user.id, display_name: user.email?.split('@')[0] || 'User' });

          if (!insertError) {
            updateCheck('profile', 'success', 'User profile created successfully!');
          }
        } else {
          updateCheck('profile', 'success', `Profile exists: ${profile.display_name || 'No name set'}`);
        }
      } catch (err) {
        updateCheck('profile', 'error', `Profile check failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }

      // Check 3: Storage Bucket
      try {
        const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
        if (bucketError) throw bucketError;

        const audioBucket = buckets?.find(b => b.name === 'audio');
        if (!audioBucket) {
          updateCheck('bucket', 'error', 'Audio bucket does not exist. Run the storage setup SQL script.');
        } else {
          updateCheck('bucket', 'success', 'Audio bucket exists');
        }
      } catch (err) {
        updateCheck('bucket', 'error', `Bucket check failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }

      // Check 4: Upload Test
      try {
        // Create a tiny test file
        const testBlob = new Blob(['test'], { type: 'audio/mpeg' });
        const testFile = new File([testBlob], 'test.mp3', { type: 'audio/mpeg' });
        const testPath = `tracks/${user.id}-test-${Date.now()}.mp3`;

        const { error: uploadError } = await supabase.storage
          .from('audio')
          .upload(testPath, testFile);

        if (uploadError) {
          updateCheck('upload', 'error', `Upload test failed: ${uploadError.message}`);
        } else {
          updateCheck('upload', 'success', 'Upload permissions working!');

          // Clean up test file
          await supabase.storage.from('audio').remove([testPath]);
        }
      } catch (err) {
        updateCheck('upload', 'error', `Upload test failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    } catch (err) {
      updateCheck('auth', 'error', `Auth check failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === 'pending') return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
    if (status === 'success') return <CheckCircle className="h-5 w-5 text-green-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="container section-padding max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1>Upload Diagnostics</h1>
          <p className="text-muted-foreground mt-2">
            Running checks to identify upload issues...
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Checks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(checks).map(([key, check]) => (
              <div key={key} className="flex items-start gap-3 p-3 border rounded-lg">
                <StatusIcon status={check.status} />
                <div className="flex-1">
                  <p className="font-medium capitalize">{key}</p>
                  <p className="text-sm text-muted-foreground">{check.message}</p>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Button onClick={runDiagnostics}>
                Run Checks Again
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">If storage bucket is missing:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>Go to your Supabase Dashboard SQL Editor</li>
                <li>Copy the contents of <code className="bg-muted px-1">supabase-storage-setup.sql</code></li>
                <li>Paste and run the script</li>
                <li>Come back and run the checks again</li>
              </ol>
            </div>

            <div className="space-y-2">
              <p className="font-medium">If you're not signed in:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>Go to the Sign In page</li>
                <li>Create an account or sign in</li>
                <li>Come back to this page</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
