'use client';

import { useEffect, useState } from 'react';
import { Play, TrendingUp, Clock, Sparkles, Music2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Track {
  id: string;
  title: string;
  genre: string;
  vibe: string;
  cover_image_url: string;
  play_count: number;
  created_at: string;
  artist: {
    display_name: string;
  };
}

export default function DiscoverPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    const { data, error } = await supabase
      .from('tracks')
      .select(`
        *,
        artist:user_profiles!tracks_artist_id_fkey(display_name)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (data) {
      setTracks(data);
    }
    setLoading(false);
  };

  const formatPlayCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Music2 className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading tracks...</p>
        </div>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container max-w-7xl px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Discover</h1>
            <p className="text-muted-foreground text-lg">Explore uplifting music from around the world</p>
          </div>
          <div className="flex flex-col items-center justify-center py-20">
            <Music2 className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold mb-2">No tracks yet</h3>
            <p className="text-muted-foreground">Be the first to upload music!</p>
          </div>
        </div>
      </div>
    );
  }

  const trendingTracks = [...tracks].sort((a, b) => b.play_count - a.play_count);
  const newTracks = [...tracks].sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, 10);
  const staffPicks = tracks.slice(0, 10);

  return (
    <div className="min-h-screen">
      <div className="container max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover</h1>
          <p className="text-muted-foreground text-lg">Explore uplifting music from around the world</p>
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="bg-secondary mb-8">
            <TabsTrigger value="trending" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="new" className="gap-2">
              <Sparkles className="h-4 w-4" />
              New Releases
            </TabsTrigger>
            <TabsTrigger value="picks" className="gap-2">
              <Music2 className="h-4 w-4" />
              Staff Picks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {trendingTracks.map((track) => (
                <Link href={`/track/${track.id}`} key={track.id}>
                  <Card className="group bg-card border-0 p-4 card-hover cursor-pointer">
                    <div className="relative aspect-square mb-4 rounded-md overflow-hidden bg-secondary">
                      {track.cover_image_url ? (
                        <img src={track.cover_image_url} alt={track.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music2 className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <Play className="h-5 w-5 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1 truncate text-sm">{track.title}</h3>
                    <p className="text-xs text-muted-foreground truncate mb-2">{track.artist?.display_name || 'Unknown Artist'}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      <span>{formatPlayCount(track.play_count)} plays</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {newTracks.map((track) => (
                <Link href={`/track/${track.id}`} key={track.id}>
                  <Card className="group bg-card border-0 p-4 card-hover cursor-pointer">
                    <div className="relative aspect-square mb-4 rounded-md overflow-hidden bg-secondary">
                      {track.cover_image_url ? (
                        <img src={track.cover_image_url} alt={track.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music2 className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <Play className="h-5 w-5 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1 truncate text-sm">{track.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{track.artist?.display_name || 'Unknown Artist'}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="picks">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {staffPicks.map((track) => (
                <Link href={`/track/${track.id}`} key={track.id}>
                  <Card className="group bg-card border-0 p-4 card-hover cursor-pointer">
                    <div className="relative aspect-square mb-4 rounded-md overflow-hidden bg-secondary">
                      {track.cover_image_url ? (
                        <img src={track.cover_image_url} alt={track.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music2 className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <Play className="h-5 w-5 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1 truncate text-sm">{track.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{track.artist?.display_name || 'Unknown Artist'}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}