import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Music, Users, TrendingUp, DollarSign, Zap, Shield } from 'lucide-react';

export default function Artists() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-background to-background"></div>

        <div className="relative container max-w-5xl mx-auto px-6 text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Built for <span className="gradient-text">Artists</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Upload your uplifting music and earn 99% of every sale. No gatekeepers, no delays, no hassles.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-full font-semibold" asChild>
            <Link href="/artists/onboarding">Start Uploading Today</Link>
          </Button>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Artists Choose Us</h2>
            <p className="text-muted-foreground text-lg">Everything you need to succeed as an independent artist</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card border-0 p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Upload</h3>
              <p className="text-muted-foreground leading-relaxed">
                No approval process. Upload your music and start selling immediately. Your music, your timeline.
              </p>
            </Card>

            <Card className="bg-card border-0 p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">99% Revenue Share</h3>
              <p className="text-muted-foreground leading-relaxed">
                Keep 99% of every sale. Weekly payouts via Stripe Connect. Full transparency on all earnings.
              </p>
            </Card>

            <Card className="bg-card border-0 p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Engaged Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with listeners who value positive, uplifting music and support independent artists.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/30">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Get started in minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-muted-foreground">Create your artist profile and connect your Stripe account</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload</h3>
              <p className="text-muted-foreground">Upload your tracks with artwork and set your pricing</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn</h3>
              <p className="text-muted-foreground">Get paid weekly as listeners stream and purchase your music</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of independent artists building a positive music community and earning fair revenue.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-10 rounded-full font-semibold" asChild>
            <Link href="/artists/onboarding">Become an Artist</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
