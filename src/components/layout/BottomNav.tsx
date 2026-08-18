'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell, LineChart, Newspaper, User, Users } from 'lucide-react';
import { cn } from '@/lib/cn';

const items = [
  { href: '/feed', label: 'Feed', icon: Newspaper },
  { href: '/group', label: 'Grupo', icon: Users },
  { href: '/routine', label: 'Rutina', icon: Dumbbell },
  { href: '/progress', label: 'Progreso', icon: LineChart },
  { href: '/profile', label: 'Perfil', icon: User },
];

// Nav inferior fija, pensada para mobile (pero funciona igual en desktop).
// 'use client' porque usePathname necesita ejecutarse en el browser.
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-cream">
      <div className="mx-auto flex max-w-3xl items-stretch justify-around">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] transition-colors',
                active ? 'text-bottle' : 'text-charcoal/50 hover:text-charcoal'
              )}
            >
              <Icon size={20} strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
