'use client';

import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Avatar, Card, CardContent, CardHeader } from '@/components/ui';
import { formatRelativeTime } from '@/lib/format';
import type { FeedPost } from '@/types';

// Client component porque el like es interactivo (toggle local). Cuando
// conectemos el feed real (Fase 8), esto va a disparar un insert/delete
// en post_likes vía Supabase en vez de solo actualizar estado local.
export function FeedPostCard({ post }: { post: FeedPost }) {
  const [liked, setLiked] = useState(post.likedByMe);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  function toggleLike() {
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-3 pb-3">
        <Avatar name={post.author.displayName} src={post.author.avatarUrl} size="sm" />
        <div className="flex flex-col">
          <p className="text-sm font-medium text-charcoal">{post.author.displayName}</p>
          <p className="text-xs text-charcoal/50">{formatRelativeTime(post.createdAt)}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <p className="font-serif text-lg text-charcoal">{post.dayName}</p>
          <p className="text-sm text-charcoal/60">
            {post.exerciseCount} ejercicios · {post.totalVolumeKg.toLocaleString('es-AR')} kg de volumen
          </p>
        </div>
        <div className="flex items-center gap-5 border-t border-line pt-3">
          <button
            onClick={toggleLike}
            className={cn(
              'flex items-center gap-1.5 text-sm transition-colors',
              liked ? 'text-gold-dark' : 'text-charcoal/60 hover:text-charcoal'
            )}
          >
            <Heart size={17} strokeWidth={1.5} fill={liked ? 'currentColor' : 'none'} />
            {likesCount}
          </button>
          <div className="flex items-center gap-1.5 text-sm text-charcoal/60">
            <MessageCircle size={17} strokeWidth={1.5} />
            {post.commentsCount}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
