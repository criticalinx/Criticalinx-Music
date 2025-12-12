# Implementation Guide - Uplifting Vibes

This guide walks you through implementing the core features step-by-step.

## Phase 1: Setup & Configuration (30 minutes)

### Step 1: Get Your Credentials

#### Supabase
Your database is already set up. Get your credentials:
1. Already have: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env`
2. You're done with Supabase!

#### Stripe (for payments)
1. Go to [stripe.com](https://stripe.com) and create an account
2. Get your test keys from Dashboard > Developers > API keys:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (starts with pk_test_)
   - `STRIPE_SECRET_KEY` (starts with sk_test_)
3. Add to `.env.local`:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
```

### Step 2: Verify Build
```bash
npm run build
npm run dev
```
Visit http://localhost:3000 - you should see the homepage.

---

## Phase 2: Authentication (1-2 hours)

### Step 1: Create Auth Pages

Create `/app/auth/signin/page.tsx`:
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div className="container section-padding max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Welcome back to Uplifting Vibes</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

Create `/app/auth/signup/page.tsx`:
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Create user profile
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          display_name: displayName,
          role: 'fan',
        });

      if (profileError) {
        setError('Account created but profile setup failed. Please contact support.');
        setLoading(false);
        return;
      }

      router.push('/dashboard');
    }
  }

  return (
    <div className="container section-padding max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Join Uplifting Vibes today</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <p className="text-xs text-muted-foreground">
                Minimum 6 characters
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Step 2: Update Header with Auth State

Update `/components/layout/Header.tsx`:
```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Upload, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/logo-icon.svg"
              alt="Uplifting Vibes"
              width={32}
              height={32}
              priority
            />
            <span className="text-xl font-semibold text-primary">Uplifting Vibes</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/discover" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Discover
            </Link>
            {user && (
              <Link href="/library" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Library
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
```

### Step 3: Test Authentication
1. Run `npm run dev`
2. Click "Get Started" or "Sign In"
3. Create a test account
4. Verify you can sign in/out
5. Check that header updates based on auth state

---

## Phase 3: File Upload (2-3 hours)

### Step 1: Create Supabase Storage Bucket

In Supabase Dashboard:
1. Go to Storage
2. Create new bucket: `audio-files`
3. Set as **private** (we'll use signed URLs)
4. Add RLS policy:
```sql
-- Allow authenticated users to upload
CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'audio-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to read files they own or purchased
CREATE POLICY "Users can read files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'audio-files');
```

### Step 2: Update Upload Page

Replace `/app/upload/page.tsx` with:
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Upload, Music, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [vibe, setVibe] = useState('');
  const [price, setPrice] = useState('0');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleUpload(publish: boolean = false) {
    if (!file || !title) {
      setError('Please provide a file and title');
      return;
    }

    setUploading(true);
    setError('');
    setProgress(0);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get or create artist profile
      let { data: artist } = await supabase
        .from('artists')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!artist) {
        const { data: newArtist, error: artistError } = await supabase
          .from('artists')
          .insert({ user_id: user.id })
          .select('id')
          .single();

        if (artistError) throw artistError;
        artist = newArtist;
      }

      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('audio-files')
        .upload(filePath, file, {
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setProgress(percent);
          },
        });

      if (uploadError) throw uploadError;

      // Create track record
      const { data: track, error: trackError } = await supabase
        .from('tracks')
        .insert({
          artist_id: artist.id,
          title,
          description,
          genre: genre || null,
          vibe: vibe || null,
          price_cents: Math.round(parseFloat(price) * 100),
          status: publish ? 'published' : 'draft',
        })
        .select()
        .single();

      if (trackError) throw trackError;

      // Create track file record
      const { error: fileError } = await supabase
        .from('track_files')
        .insert({
          track_id: track.id,
          file_type: 'original',
          storage_path: filePath,
          file_size: file.size,
        });

      if (fileError) throw fileError;

      // Success!
      router.push(`/track/${track.id}`);
    } catch (err: any) {
      setError(err.message);
      setUploading(false);
    }
  }

  return (
    <div className="container section-padding max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1>Upload Track</h1>
          <p className="text-muted-foreground mt-2">
            Share your positive music with the world. Keep 99% of revenue.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Track Details</CardTitle>
            <CardDescription>
              Upload your audio file and add information about your track.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded text-sm">
                {error}
              </div>
            )}

            <div className="border-2 border-dashed rounded-lg p-12 text-center space-y-4 hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="file-upload"
                accept="audio/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                {file ? (
                  <div className="space-y-2">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Drop your audio file here</p>
                      <p className="text-sm text-muted-foreground">or click to browse</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Supports MP3, WAV, FLAC (max 500MB)
                      </p>
                    </div>
                  </>
                )}
              </label>
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Track Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter track title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your track..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger id="genre">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="acoustic">Acoustic</SelectItem>
                      <SelectItem value="hip-hop">Hip Hop</SelectItem>
                      <SelectItem value="indie">Indie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vibe">Vibe</Label>
                  <Select value={vibe} onValueChange={setVibe}>
                    <SelectTrigger id="vibe">
                      <SelectValue placeholder="Select vibe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="energetic">Energetic</SelectItem>
                      <SelectItem value="chill">Chill</SelectItem>
                      <SelectItem value="motivational">Motivational</SelectItem>
                      <SelectItem value="peaceful">Peaceful</SelectItem>
                      <SelectItem value="joyful">Joyful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Set to $0.00 for free streaming. You keep 99% of paid sales.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleUpload(false)}
                disabled={uploading}
              >
                Save as Draft
              </Button>
              <Button
                className="flex-1 bg-primary"
                onClick={() => handleUpload(true)}
                disabled={uploading}
              >
                <Music className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Publish Track'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

### Step 3: Test Upload
1. Sign in
2. Go to /upload
3. Select an audio file
4. Fill in track details
5. Click "Publish Track"
6. Verify track appears in Supabase

---

## Phase 4: Display Real Tracks (1 hour)

### Update Discover Page

Replace `/app/discover/page.tsx`:
```tsx
import { supabase } from '@/lib/supabase';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export const revalidate = 60; // Revalidate every 60 seconds

async function getTracks() {
  const { data: tracks } = await supabase
    .from('tracks')
    .select(`
      *,
      artist:artists(
        id,
        user:users(display_name)
      )
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(12);

  return tracks || [];
}

export default async function DiscoverPage() {
  const tracks = await getTracks();

  return (
    <div className="container section-padding max-w-7xl">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1>Discover Music</h1>
          <div className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search artists, tracks, vibes..." className="pl-9" />
            </div>
            <Button>Search</Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Tracks</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tracks.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TrackCard({ track }: { track: any }) {
  return (
    <Link href={`/track/${track.id}`}>
      <Card className="p-4 space-y-3 hover:shadow-lg transition-shadow">
        <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
          <span className="text-4xl">🎵</span>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold truncate">{track.title}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {track.artist?.user?.display_name || 'Unknown Artist'}
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{track.play_count} plays</span>
            <span>
              {track.price_cents === 0 ? 'Free' : `$${(track.price_cents / 100).toFixed(2)}`}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
```

---

## Phase 5: Audio Playback (2-3 hours)

### Simple Audio Player (without HLS)

Update `/app/track/[id]/page.tsx`:
```tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Play, Pause, DollarSign, Share2, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export function generateStaticParams() {
  return [];
}

export default function TrackPage({ params }: { params: { id: string } }) {
  const [track, setTrack] = useState<any>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => typeof window !== 'undefined' ? new Audio() : null);

  useEffect(() => {
    loadTrack();
  }, [params.id]);

  async function loadTrack() {
    const { data: trackData } = await supabase
      .from('tracks')
      .select(`
        *,
        artist:artists(
          id,
          user:users(display_name)
        ),
        track_files(storage_path)
      `)
      .eq('id', params.id)
      .single();

    if (trackData) {
      setTrack(trackData);

      // Get signed URL for audio file
      const filePath = trackData.track_files[0]?.storage_path;
      if (filePath) {
        const { data } = await supabase.storage
          .from('audio-files')
          .createSignedUrl(filePath, 3600); // 1 hour

        if (data?.signedUrl) {
          setAudioUrl(data.signedUrl);
          if (audio) audio.src = data.signedUrl;
        }
      }
    }
  }

  function togglePlay() {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  if (!track) return <div className="container section-padding">Loading...</div>;

  return (
    <div className="container section-padding max-w-5xl">
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <span className="text-6xl">🎵</span>
          </div>
          <Button className="w-full bg-primary" size="lg" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          {track.price_cents > 0 && (
            <Button className="w-full bg-accent" size="lg">
              <DollarSign className="h-4 w-4 mr-2" />
              Purchase ${(track.price_cents / 100).toFixed(2)}
            </Button>
          )}
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{track.title}</h1>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {track.artist?.user?.display_name?.[0] || 'A'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{track.artist?.user?.display_name || 'Unknown Artist'}</p>
                <p className="text-sm text-muted-foreground">Independent Artist</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <span>{track.play_count} plays</span>
              <span>{track.purchase_count} purchases</span>
              {track.genre && <span>{track.genre}</span>}
              {track.vibe && <span>{track.vibe}</span>}
            </div>
          </div>

          {track.description && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold">About This Track</h3>
                <p className="text-muted-foreground leading-relaxed">{track.description}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## Testing Checklist

After implementing each phase:

✅ **Authentication**
- [ ] Can create account
- [ ] Can sign in
- [ ] Can sign out
- [ ] Header updates correctly

✅ **Upload**
- [ ] Can select file
- [ ] Upload progress shows
- [ ] Track created in database
- [ ] File stored in Supabase Storage

✅ **Display**
- [ ] Tracks show on discover page
- [ ] Artist names display
- [ ] Track details load

✅ **Playback**
- [ ] Audio plays/pauses
- [ ] No console errors

---

## Next Steps After This

1. **Stripe Payments**: Add purchase flow
2. **Comments**: Real-time discussion threads
3. **Search**: Full-text search functionality
4. **Analytics**: Track plays and revenue
5. **HLS Streaming**: Convert audio to HLS format

---

## Need Help?

**Common Issues:**

1. **"Not authenticated" errors**: Make sure you're signed in
2. **Upload fails**: Check Supabase Storage bucket exists and has correct RLS policies
3. **Audio won't play**: Check browser console for CORS or file access errors
4. **Build errors**: Run `npm run build` to see specific TypeScript errors

**Next Phase Resources:**
- Stripe Integration: See `/netlify/functions/stripe-webhook.ts` (already set up)
- Real-time Comments: Use Supabase Realtime subscriptions
- HLS Conversion: Use ffmpeg in Netlify function or external service

You're ready to start! Begin with Phase 1 (setup) and work through each phase in order.