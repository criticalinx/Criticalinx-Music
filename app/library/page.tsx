'use client';

import Link from 'next/link';
import { Music, Heart, Clock, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Library() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Library</h1>
          <p className="text-muted-foreground text-lg">Your collection of uplifting music</p>
        </div>

        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="bg-secondary mb-8">
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="recent" className="gap-2">
              <Clock className="h-4 w-4" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="purchased" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Purchased
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No favorites yet</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Start exploring music and save your favorites here
              </p>
              <Button asChild>
                <Link href="/discover">Discover Music</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
                <Clock className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No recent plays</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Tracks you listen to will appear here
              </p>
              <Button asChild>
                <Link href="/discover">Start Listening</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="purchased">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No purchases yet</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Support artists by purchasing their tracks
              </p>
              <Button asChild>
                <Link href="/discover">Browse Music</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
