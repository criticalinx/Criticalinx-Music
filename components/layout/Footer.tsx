import Link from 'next/link';
import { Music } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 mt-auto">
      <div className="container max-w-7xl py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Music className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Uplifting Vibes
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A platform for positive music. Empowering artists with fair revenue sharing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">For Artists</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/artists/onboarding" className="text-muted-foreground hover:text-primary transition-colors">Get Started</Link></li>
              <li><Link href="/artists/guidelines" className="text-muted-foreground hover:text-primary transition-colors">Guidelines</Link></li>
              <li><Link href="/artists/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Uplifting Vibes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}