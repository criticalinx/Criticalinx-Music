import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="container section-padding max-w-6xl">
      <div className="space-y-12">
        <div className="text-center">
          <h1>Simple, Fair Pricing</h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            We believe in transparent pricing. Artists keep 97% of revenue, and listeners
            enjoy affordable access to great music.
          </p>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Listener Subscriptions</h2>
            <p className="text-muted-foreground">Choose the plan that works for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Perfect for casual listeners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-4xl font-bold mb-2">$0</div>
                  <p className="text-sm text-muted-foreground">Forever free</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Stream unlimited music</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Create playlists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Community features</span>
                  </li>
                </ul>
                <Link href="/auth/signup">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>Enhanced listening experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-4xl font-bold mb-2">$4.99</div>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Ad-free listening</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">High quality audio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Offline downloads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Early access to new releases</span>
                  </li>
                </ul>
                <Link href="/auth/signup">
                  <Button className="w-full">Subscribe</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-primary border-2 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>Ultimate music experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-4xl font-bold mb-2">$9.99</div>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Everything in Basic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Exclusive artist content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-sm">Concert ticket discounts</span>
                  </li>
                </ul>
                <Link href="/auth/signup">
                  <Button className="w-full bg-primary">Subscribe</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="border-t border-border pt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">For Artists</h2>
            <p className="text-muted-foreground">Share your music and earn fairly</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upload & Sell</CardTitle>
              <CardDescription>Standard plan for all artists</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-bold mb-2">3%</div>
                <p className="text-sm text-muted-foreground">Platform fee - you keep 97%</p>
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
                  <span className="text-sm">Keep 97% of revenue</span>
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

          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Community Benefits</CardTitle>
              <CardDescription>What makes us different</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-bold mb-2">Fair</div>
                <p className="text-sm text-muted-foreground">Transparent revenue sharing</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Direct fan engagement</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Community discussions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Weekly payouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Full ownership rights</span>
                </li>
              </ul>
              <Link href="/about">
                <Button variant="outline" className="w-full">Learn More</Button>
              </Link>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
