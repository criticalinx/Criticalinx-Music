import Link from 'next/link';
import { Music } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="container max-w-7xl py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-lg font-semibold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                Uplifting Vibes
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A platform for positive music. Empowering artists with fair revenue sharing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link href="/how-it-works" className="hover:text-accent transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">For Artists</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/artists/onboarding" className="hover:text-accent transition-colors">Get Started</Link></li>
              <li><Link href="/artists/guidelines" className="hover:text-accent transition-colors">Guidelines</Link></li>
              <li><Link href="/artists/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-accent transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy</Link></li>
              <li><Link href="/cookies" className="hover:text-accent transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Uplifting Vibes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}