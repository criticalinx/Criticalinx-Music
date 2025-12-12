import { Play, TrendingUp, Clock, Sparkles, Music2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DiscoverPage() {
  const tracks = [
    { id: 1, title: 'Sunshine Melody', artist: 'Happy Sounds', duration: '3:24', plays: '1.2M', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, title: 'Morning Glory', artist: 'Upbeat Collective', duration: '4:12', plays: '980K', image: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, title: 'Rising Hope', artist: 'Positive Wave', duration: '3:45', plays: '856K', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 4, title: 'Joyful Journey', artist: 'Bright Tones', duration: '4:30', plays: '720K', image: 'https://images.pexels.com/photos/210887/pexels-photo-210887.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 5, title: 'Sweet Serenity', artist: 'Calm Collective', duration: '3:58', plays: '654K', image: 'https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 6, title: 'Dream State', artist: 'Peaceful Minds', duration: '5:12', plays: '542K', image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

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
              {tracks.map((track) => (
                <Card key={track.id} className="group bg-card border-0 p-4 card-hover cursor-pointer">
                  <div className="relative aspect-square mb-4 rounded-md overflow-hidden bg-secondary">
                    <img src={track.image} alt={track.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <Play className="h-5 w-5 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1 truncate text-sm">{track.title}</h3>
                  <p className="text-xs text-muted-foreground truncate mb-2">{track.artist}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{track.duration}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {tracks.slice(0, 4).map((track) => (
                <Card key={track.id} className="group bg-card border-0 p-4 card-hover cursor-pointer">
                  <div className="relative aspect-square mb-4 rounded-md overflow-hidden bg-secondary">
                    <img src={track.image} alt={track.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <Play className="h-5 w-5 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1 truncate text-sm">{track.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="picks">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {tracks.slice(2).map((track) => (
                <Card key={track.id} className="group bg-card border-0 p-4 card-hover cursor-pointer">
                  <div className="relative aspect-square mb-4 rounded-md overflow-hidden bg-secondary">
                    <img src={track.image} alt={track.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <Play className="h-5 w-5 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1 truncate text-sm">{track.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}