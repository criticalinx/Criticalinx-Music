'use client';

import Link from 'next/link';
import { Music, Search, Home, Library, Upload, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Music className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Uplifting Vibes
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors">
              Home
            </Link>
            <Link href="/discover" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors">
              Discover
            </Link>
            <Link href="/library" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors">
              Library
            </Link>
            <Link href="/artists" className="px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors">
              For Artists
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search songs, artists..."
              className="pl-9 w-64 bg-secondary border-0 focus-visible:ring-1"
            />
          </div>

          <Button variant="ghost" size="sm" asChild className="hidden md:flex">
            <Link href="/upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/signin">Log in</Link>
          </Button>

          <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/auth/signup">Sign up</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}