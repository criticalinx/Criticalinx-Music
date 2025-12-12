'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, CheckCircle } from 'lucide-react';

export default function ArtistOnboarding() {
  const [step, setStep] = useState(1);
  const [artistName, setArtistName] = useState('');
  const [bio, setBio] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 py-12 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Music className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-2">Become an Artist</h1>
          <p className="text-muted-foreground">Set up your artist profile and start uploading music</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                {step > 1 ? <CheckCircle className="h-6 w-6" /> : '1'}
              </div>
              <span className="text-xs mt-2">Profile</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                {step > 2 ? <CheckCircle className="h-6 w-6" /> : '2'}
              </div>
              <span className="text-xs mt-2">Payment</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="text-xs mt-2">Done</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Artist Profile</CardTitle>
              <CardDescription>Tell us about yourself and your music</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="artistName">Artist Name</Label>
                  <Input
                    id="artistName"
                    placeholder="Your stage name"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genre">Primary Genre</Label>
                  <Input
                    id="genre"
                    placeholder="e.g., Pop, Jazz, Classical"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell listeners about your music journey..."
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Setup</CardTitle>
              <CardDescription>Connect your Stripe account to receive payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">99% Revenue Share</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We use Stripe Connect to handle payments securely. You'll receive 99% of every sale, paid out weekly.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Instant payouts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Full transparency
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Secure & reliable
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <Button className="w-full" onClick={() => setStep(3)}>
                  Connect Stripe Account
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-primary" />
              <CardTitle>You're all set!</CardTitle>
              <CardDescription>Start uploading your uplifting music</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 p-6 rounded-lg space-y-3">
                <h3 className="font-semibold">What's next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Upload your first track</li>
                  <li>• Set your pricing</li>
                  <li>• Share with your fans</li>
                  <li>• Watch your earnings grow</li>
                </ul>
              </div>
              <Button className="w-full" asChild>
                <Link href="/upload">Upload Your First Track</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
