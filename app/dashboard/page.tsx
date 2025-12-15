'use client';

import { useState, useEffect } from 'react';
import { Music, Upload, Eye, EyeOff, Trash2, Edit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Track {
  id: string;
  title: string;
  description: string;
  genre: string;
  vibe: string;
  status: 'draft' | 'pre-release' | 'published';
  play_count: number;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackToDelete, setTrackToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to view your dashboard.',
          variant: 'destructive',
        });
        return;
      }

      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .eq('artist_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTracks(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load tracks',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateTrackStatus = async (trackId: string, newStatus: 'draft' | 'pre-release' | 'published') => {
    try {
      const { error } = await supabase
        .from('tracks')
        .update({ status: newStatus })
        .eq('id', trackId);

      if (error) throw error;

      toast({
        title: 'Status updated',
        description: `Track ${newStatus === 'published' ? 'published' : newStatus === 'pre-release' ? 'moved to pre-release' : 'saved as draft'} successfully.`,
      });

      loadTracks();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update track status',
        variant: 'destructive',
      });
    }
  };

  const deleteTrack = async (trackId: string) => {
    try {
      const { error } = await supabase
        .from('tracks')
        .delete()
        .eq('id', trackId);

      if (error) throw error;

      toast({
        title: 'Track deleted',
        description: 'Your track has been deleted successfully.',
      });

      loadTracks();
      setTrackToDelete(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete track',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'pre-release':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Pre-Release</Badge>;
      case 'published':
        return <Badge variant="default" className="bg-green-600">Published</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getActionButton = (track: Track) => {
    if (track.status === 'draft') {
      return (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateTrackStatus(track.id, 'pre-release')}
          >
            <Eye className="h-4 w-4 mr-1" />
            Pre-Release
          </Button>
          <Button
            size="sm"
            onClick={() => updateTrackStatus(track.id, 'published')}
          >
            Publish
          </Button>
        </div>
      );
    } else if (track.status === 'pre-release') {
      return (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateTrackStatus(track.id, 'draft')}
          >
            <EyeOff className="h-4 w-4 mr-1" />
            Unpublish
          </Button>
          <Button
            size="sm"
            onClick={() => updateTrackStatus(track.id, 'published')}
          >
            Publish to All
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          size="sm"
          variant="outline"
          onClick={() => updateTrackStatus(track.id, 'pre-release')}
        >
          <EyeOff className="h-4 w-4 mr-1" />
          Unpublish
        </Button>
      );
    }
  };

  if (loading) {
    return (
      <div className="container section-padding max-w-6xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading your tracks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-padding max-w-6xl">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1>Artist Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your tracks and share them for feedback
            </p>
          </div>
          <Link href="/upload">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Track
            </Button>
          </Link>
        </div>

        {tracks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Music className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium">No tracks yet</p>
                <p className="text-sm text-muted-foreground">
                  Upload your first track to get started
                </p>
              </div>
              <Link href="/upload">
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Track
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {tracks.map((track) => (
              <Card key={track.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{track.title}</CardTitle>
                        {getStatusBadge(track.status)}
                      </div>
                      <CardDescription>
                        {track.description || 'No description'}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {getActionButton(track)}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setTrackToDelete(track.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    {track.genre && (
                      <div className="flex items-center gap-1">
                        <Music className="h-4 w-4" />
                        {track.genre}
                      </div>
                    )}
                    {track.vibe && (
                      <div>
                        Vibe: {track.vibe}
                      </div>
                    )}
                    <div>
                      Plays: {track.play_count}
                    </div>
                    {track.status === 'pre-release' && (
                      <Link href={`/track/${track.id}`}>
                        <Button size="sm" variant="link" className="h-auto p-0">
                          View Pre-Release Page
                        </Button>
                      </Link>
                    )}
                    {track.status === 'published' && (
                      <Link href={`/track/${track.id}`}>
                        <Button size="sm" variant="link" className="h-auto p-0">
                          View Track Page
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!trackToDelete} onOpenChange={() => setTrackToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Track</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this track? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => trackToDelete && deleteTrack(trackToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
