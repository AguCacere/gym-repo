'use client';

import Link from 'next/link';
import { FeedPostCard } from '@/components/feed/FeedPostCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { buttonVariants } from '@/components/ui';
import { useAppStore } from '@/lib/store';

export default function FeedPage() {
  const feedPosts = useAppStore((s) => s.feedPosts);
  const group = useAppStore((s) => s.group);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-8">
      <PageHeader
        eyebrow={group.name}
        title="Feed"
        action={
          <Link href="/routine" className={buttonVariants({ size: 'sm' })}>
            Registrar
          </Link>
        }
      />

      {feedPosts.length === 0 ? (
        <p className="py-12 text-center text-sm text-charcoal/50">
          Todavía no hay entrenamientos en el feed. Registrá el tuyo desde Rutina.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {feedPosts.map((post) => (
            <FeedPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
