import { FeedPostCard } from '@/components/feed/FeedPostCard';
import { mockFeedPosts } from '@/lib/mock-data';

export default function FeedPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Fuerza &amp; Disciplina</p>
        <h1 className="font-serif text-3xl text-charcoal">Feed</h1>
      </header>

      <div className="flex flex-col gap-4">
        {mockFeedPosts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
