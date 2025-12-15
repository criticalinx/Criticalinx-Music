'use client';

import { Play, DollarSign, Share2, Flag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { DiscussionThread } from '@/components/discussion/DiscussionThread';
import { useState } from 'react';

export default function TrackPage({ params }: { params: { id: string } }) {
  const [discussions, setDiscussions] = useState([
    {
      id: '1',
      user_id: 'user1',
      message: 'This track is amazing! Really uplifting and positive vibes.',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      user: {
        display_name: 'Sarah Johnson',
        avatar_url: '',
      },
      reactions: {
        like: 5,
        love: 2,
      },
      hasUserReacted: false,
    },
    {
      id: '2',
      user_id: 'user2',
      message: 'Love the energy in this! Perfect for my morning routine.',
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      user: {
        display_name: 'Mike Chen',
        avatar_url: '',
      },
      reactions: {
        like: 3,
        love: 1,
      },
      hasUserReacted: false,
    },
  ]);

  const handlePostMessage = (message: string, parentId?: string) => {
    const newDiscussion = {
      id: Date.now().toString(),
      user_id: 'current-user',
      message,
      created_at: new Date().toISOString(),
      user: {
        display_name: 'You',
        avatar_url: '',
      },
      reactions: {
        like: 0,
        love: 0,
      },
      hasUserReacted: false,
    };
    setDiscussions([newDiscussion, ...discussions]);
  };

  const handleReact = (discussionId: string, reactionType: string) => {
    setDiscussions(discussions.map(d => {
      if (d.id === discussionId) {
        return {
          ...d,
          reactions: {
            ...d.reactions,
            [reactionType]: d.hasUserReacted
              ? (d.reactions?.[reactionType as keyof typeof d.reactions] || 0) - 1
              : (d.reactions?.[reactionType as keyof typeof d.reactions] || 0) + 1,
          },
          hasUserReacted: !d.hasUserReacted,
        };
      }
      return d;
    }));
  };
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
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <MessageCircle className="h-6 w-6" />
                Discussion ({discussions.length})
              </h3>
            </div>

            <DiscussionThread
              trackId={params.id}
              discussions={discussions}
              onPostMessage={handlePostMessage}
              onReact={handleReact}
            />
          </div>
        </div>
      </div>
    </div>
  );
}