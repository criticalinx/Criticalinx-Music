'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Music, Search, Home, Library, Upload, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    setProfile(data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

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

          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden md:flex">
                <Link href="/dashboard">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>

              <Button variant="ghost" size="sm" asChild className="hidden md:flex">
                <Link href="/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{profile?.display_name || user.email?.split('@')[0]}</span>
                    <Badge variant="secondary" className="ml-1">Logged in</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/library">Library</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/signin">Log in</Link>
              </Button>

              <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/auth/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}