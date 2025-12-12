import { Play, DollarSign, Share2, Flag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export function generateStaticParams() {
  return [];
}

export default function TrackPage({ params }: { params: { id: string } }) {
  return (
    <div className="container section-padding max-w-5xl">
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <Play className="h-16 w-16 text-muted-foreground" />
          </div>
          <Button className="w-full bg-primary" size="lg">
            <Play className="h-4 w-4 mr-2" />
            Play
          </Button>
          <Button className="w-full bg-accent" size="lg">
            <DollarSign className="h-4 w-4 mr-2" />
            Purchase $2.99
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Flag className="h-4 w-4 mr-2" />
              Flag
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Track Title</h1>

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Artist Name</p>
                <p className="text-sm text-muted-foreground">Independent Artist</p>
              </div>
            </div>

            <div className="flex gap-6 text-sm text-muted-foreground">
              <span>1,234 plays</span>
              <span>56 purchases</span>
              <span>Electronic</span>
              <span>Energetic</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-semibold">About This Track</h3>
            <p className="text-muted-foreground leading-relaxed">
              Track description goes here. This is a positive, uplifting track designed to
              inspire and energize listeners. Created with love and positive intentions.
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Discussion (12)
              </h3>
              <Button variant="outline" size="sm">Add Comment</Button>
            </div>

            <Card className="p-4 space-y-3">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Username</span>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This track is amazing! Really uplifting and positive vibes.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}