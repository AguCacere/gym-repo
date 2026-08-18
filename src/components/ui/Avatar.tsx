import { cn } from '@/lib/cn';

type Size = 'sm' | 'md' | 'lg';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: Size;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-16 w-16 text-lg',
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const initials = parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
  return initials.toUpperCase();
}

// Avatar circular con fallback a iniciales. Usa <img> plano en vez de
// next/image porque las fotos van a venir de Supabase Storage (URLs
// externas) y no vale la pena configurar remotePatterns todavía.
export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  if (!src) {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full border border-line bg-bottle font-serif font-medium text-cream',
          sizeClasses[size],
          className
        )}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      className={cn(
        'shrink-0 rounded-full border border-line object-cover',
        sizeClasses[size],
        className
      )}
    />
  );
}
