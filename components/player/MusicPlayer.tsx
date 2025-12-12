'use client';

import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 z-50">
      <div className="container px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 w-64">
            <div className="h-12 w-12 bg-muted rounded" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Track Title</p>
              <p className="text-xs text-muted-foreground truncate">Artist Name</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                className="h-10 w-10 rounded-full bg-primary"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 w-full max-w-2xl">
              <span className="text-xs text-muted-foreground w-10 text-right">0:00</span>
              <Slider
                value={[progress]}
                onValueChange={(value) => setProgress(value[0])}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-10">3:45</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-32">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}