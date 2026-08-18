import { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

// Encabezado consistente para las pantallas de la app (eyebrow dorado +
// título serif + descripción opcional). Antes esto estaba repetido en
// cada page.tsx con clases ligeramente distintas.
export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">{eyebrow}</p>
        <h1 className="font-serif text-3xl text-charcoal">{title}</h1>
        {description && <p className="text-sm text-charcoal/60">{description}</p>}
      </div>
      {action}
    </header>
  );
}
