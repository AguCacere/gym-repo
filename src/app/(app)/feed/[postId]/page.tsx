'use client';

import { use, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';
import { Avatar, Button, Card, CardContent, CardHeader, Input } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatRelativeTime } from '@/lib/format';
import { useAppStore } from '@/lib/store';
import type { WorkoutSet } from '@/types';

export default function FeedPostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = use(params);

  const post = useAppStore((s) => s.feedPosts.find((p) => p.id === postId));
  const log = useAppStore((s) => s.workoutLogs.find((l) => l.id === post?.workoutLogId));
  const toggleLike = useAppStore((s) => s.toggleLike);
  const addComment = useAppStore((s) => s.addComment);

  const [comment, setComment] = useState('');

  if (!post) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-8">
        <p className="text-charcoal/60">No encontramos ese post.</p>
        <Link href="/feed" className="text-sm text-bottle underline">
          Volver al feed
        </Link>
      </div>
    );
  }

  const exerciseGroups = Object.values(
    (log?.sets ?? []).reduce<Record<string, WorkoutSet[]>>((acc, s) => {
      acc[s.exerciseName] = [...(acc[s.exerciseName] ?? []), s];
      return acc;
    }, {})
  );

  function handleSubmitComment(e: FormEvent) {
    e.preventDefault();
    if (!comment.trim() || !post) return;
    addComment(post.id, comment.trim());
    setComment('');
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8">
      <Link href="/feed" className="flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal">
        <ArrowLeft size={16} strokeWidth={1.5} /> Feed
      </Link>

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
            <p className="font-serif text-2xl text-charcoal">{post.dayName}</p>
            <p className="text-sm text-charcoal/60">
              {post.exerciseCount} ejercicios · {post.totalVolumeKg.toLocaleString('es-AR')} kg de volumen
            </p>
          </div>

          {exerciseGroups.length > 0 && (
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {exerciseGroups.map((sets) => (
                <div key={sets[0].exerciseName} className="flex flex-col gap-1.5 py-3">
                  <p className="text-sm font-medium text-charcoal">{sets[0].exerciseName}</p>
                  <div className="flex flex-wrap gap-2">
                    {sets.map((s) => (
                      <span
                        key={s.id}
                        className="rounded-sm border border-line bg-cream px-2 py-1 text-xs text-charcoal/70"
                      >
                        {s.reps} × {s.weightKg} kg
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => toggleLike(post.id)}
            className={cn(
              'flex w-fit items-center gap-1.5 text-sm transition-colors',
              post.likedByMe ? 'text-gold-dark' : 'text-charcoal/60 hover:text-charcoal'
            )}
          >
            <Heart size={17} strokeWidth={1.5} fill={post.likedByMe ? 'currentColor' : 'none'} />
            {post.likesCount} {post.likesCount === 1 ? 'like' : 'likes'}
          </button>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium text-charcoal">
          Comentarios {post.comments.length > 0 && `(${post.comments.length})`}
        </p>

        {post.comments.length === 0 ? (
          <p className="text-sm text-charcoal/50">Sé el primero en comentar.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {post.comments.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <Avatar name={c.author.displayName} src={c.author.avatarUrl} size="sm" />
                <div className="flex flex-1 flex-col rounded-sm border border-line bg-bone px-3.5 py-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-charcoal">{c.author.displayName}</p>
                    <p className="text-xs text-charcoal/40">{formatRelativeTime(c.createdAt)}</p>
                  </div>
                  <p className="text-sm text-charcoal/80">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmitComment} className="flex items-center gap-2">
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribí un comentario..."
            className="flex-1"
          />
          <Button type="submit" size="sm" disabled={!comment.trim()}>
            Comentar
          </Button>
        </form>
      </div>
    </div>
  );
}
