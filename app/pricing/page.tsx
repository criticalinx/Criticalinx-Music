import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="container section-padding max-w-6xl">
      <div className="space-y-12">
        <div className="text-center">
          <h1>Simple, Fair Pricing</h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            We believe in transparent pricing. Artists keep 99% of revenue, and listeners
            enjoy affordable access to great music.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>For Listeners</CardTitle>
              <CardDescription>Discover and enjoy positive music</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-bold mb-2">Free</div>
                <p className="text-sm text-muted-foreground">Stream unlimited tracks</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Unlimited streaming</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Curated playlists</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Purchase tracks to own</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Support artists directly</span>
                </li>
              </ul>
              <Link href="/auth/signup">
                <Button className="w-full">Get Started</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-primary">
            <CardHeader>
              <CardTitle>For Artists</CardTitle>
              <CardDescription>Share your music and earn fairly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-bold mb-2">1%</div>
                <p className="text-sm text-muted-foreground">Platform fee - you keep 99%</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Unlimited uploads</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Set your own pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Keep 99% of revenue</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Analytics dashboard</span>
                </li>
              </ul>
              <Link href="/artists/onboarding">
                <Button className="w-full bg-primary">Start Uploading</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
