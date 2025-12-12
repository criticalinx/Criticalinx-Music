import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, TrendingUp, Heart, DollarSign, Sparkles } from 'lucide-react';

export default function Home() {
  const featuredTracks = [
    { id: 1, title: 'Sunshine Melody', artist: 'Happy Sounds', duration: '3:24', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, title: 'Morning Glory', artist: 'Upbeat Collective', duration: '4:12', image: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, title: 'Rising Hope', artist: 'Positive Wave', duration: '3:45', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 4, title: 'Joyful Journey', artist: 'Bright Tones', duration: '4:30', image: 'https://images.pexels.com/photos/210887/pexels-photo-210887.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

        <div className="relative container max-w-6xl text-center space-y-8 px-6 py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Positive Music Platform</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            Where <span className="gradient-text">positivity</span>
            <br />meets music
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Stream uplifting music. Support independent artists. 99% goes directly to creators.
          </p>

          <div className="flex gap-4 justify-center pt-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-8 text-base font-semibold rounded-full" asChild>
              <Link href="/auth/signup">
                Get Started Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold rounded-full border-border hover:bg-secondary" asChild>
              <Link href="/discover">
                <Play className="h-4 w-4 mr-2" />
                Explore Music
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-7xl px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
              <p className="text-muted-foreground">Most uplifting tracks this week</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/discover">See all</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredTracks.map((track) => (
              <Card key={track.id} className="group bg-card border-0 p-4 card-hover cursor-pointer">
                <div className="relative aspect-square mb-4 rounded-md overflow-hidden bg-secondary">
                  <img src={track.image} alt={track.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <Play className="h-5 w-5 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold mb-1 truncate">{track.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/30">
        <div className="container max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg">A platform built for artists and listeners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-0 p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Positive Vibes Only</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every track is uplifting. Community-moderated to keep the platform inspiring and positive.
              </p>
            </Card>

            <Card className="bg-card border-0 p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">99% to Artists</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fair revenue split. Weekly payouts via Stripe. Full transparency on every sale.
              </p>
            </Card>

            <Card className="bg-card border-0 p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Upload</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload and sell instantly. No approval process. No gatekeepers. No waiting.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to share your music?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of independent artists building a positive music community and earning fair revenue.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-10 text-base font-semibold rounded-full" asChild>
            <Link href="/artists/onboarding">Become an Artist</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
