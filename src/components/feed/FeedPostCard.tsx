'use client';

import Link from 'next/link';
import { Heart, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Avatar, Card, CardContent, CardHeader } from '@/components/ui';
import { formatRelativeTime } from '@/lib/format';
import { useAppStore } from '@/lib/store';
import type { FeedPost } from '@/types';

// Lee el post en vivo del store por id (en vez de recibir todo el objeto
// como prop estática) para que el like se mantenga sincronizado entre el
// feed y la vista de detalle del post.
export function FeedPostCard({ post }: { post: FeedPost }) {
  const live = useAppStore((s) => s.feedPosts.find((p) => p.id === post.id)) ?? post;
  const toggleLike = useAppStore((s) => s.toggleLike);

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-3 pb-3">
        <Avatar name={live.author.displayName} src={live.author.avatarUrl} size="sm" />
        <div className="flex flex-col">
          <p className="text-sm font-medium text-charcoal">{live.author.displayName}</p>
          <p className="text-xs text-charcoal/50">{formatRelativeTime(live.createdAt)}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Link href={`/feed/${live.id}`} className="flex flex-col gap-1">
          <p className="font-serif text-lg text-charcoal">{live.dayName}</p>
          <p className="text-sm text-charcoal/60">
            {live.exerciseCount} ejercicios · {live.totalVolumeKg.toLocaleString('es-AR')} kg de volumen
          </p>
        </Link>
        <div className="flex items-center gap-5 border-t border-line pt-3">
          <button
            onClick={() => toggleLike(live.id)}
            className={cn(
              'flex items-center gap-1.5 text-sm transition-colors',
              live.likedByMe ? 'text-gold-dark' : 'text-charcoal/60 hover:text-charcoal'
            )}
          >
            <Heart size={17} strokeWidth={1.5} fill={live.likedByMe ? 'currentColor' : 'none'} />
            {live.likesCount}
          </button>
          <Link
            href={`/feed/${live.id}`}
            className="flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal"
          >
            <MessageCircle size={17} strokeWidth={1.5} />
            {live.comments.length}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
