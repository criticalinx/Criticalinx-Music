'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Reply, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Discussion {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
  user?: {
    display_name: string;
    avatar_url?: string;
  };
  reactions?: {
    like: number;
    love: number;
  };
  hasUserReacted?: boolean;
}

interface DiscussionThreadProps {
  trackId: string;
  discussions?: Discussion[];
  onPostMessage?: (message: string, parentId?: string) => void;
  onReact?: (discussionId: string, reactionType: string) => void;
}

export function DiscussionThread({
  trackId,
  discussions = [],
  onPostMessage,
  onReact,
}: DiscussionThreadProps) {
  const [newMessage, setNewMessage] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const handleSubmit = () => {
    if (newMessage.trim() && onPostMessage) {
      onPostMessage(newMessage, replyTo || undefined);
      setNewMessage('');
      setReplyTo(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card key={discussion.id} className="p-4 bg-secondary/30 border-border">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={discussion.user?.avatar_url} />
                <AvatarFallback>
                  {discussion.user?.display_name?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-sm">
                      {discussion.user?.display_name || 'Anonymous'}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-foreground leading-relaxed">
                  {discussion.message}
                </p>

                <div className="flex items-center gap-4 pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-2 text-muted-foreground hover:text-primary"
                    onClick={() => onReact?.(discussion.id, 'like')}
                  >
                    <Heart className={`h-4 w-4 ${discussion.hasUserReacted ? 'fill-primary text-primary' : ''}`} />
                    <span className="text-xs">{discussion.reactions?.like || 0}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setReplyTo(discussion.id)}
                  >
                    <Reply className="h-4 w-4" />
                    <span className="text-xs">Reply</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-card border-border">
        {replyTo && (
          <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
            <span>Replying to comment</span>
            <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>
              Cancel
            </Button>
          </div>
        )}
        <div className="flex gap-3">
          <Textarea
            placeholder="Share your thoughts about this track..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-[80px] resize-none bg-secondary border-0 focus-visible:ring-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleSubmit();
              }
            }}
          />
        </div>
        <div className="flex justify-end mt-3">
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!newMessage.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4 mr-2" />
            Post
          </Button>
        </div>
      </Card>
    </div>
  );
}
