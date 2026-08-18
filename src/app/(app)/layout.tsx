import { BottomNav } from '@/components/layout/BottomNav';

// Layout compartido por las pantallas de la app (feed, grupo, rutina,
// progreso, perfil). Separado del layout raíz para que en la Fase 3 el
// login/registro puedan vivir en su propio grupo de rutas, sin esta nav.
export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pb-16">
      <div className="flex-1">{children}</div>
      <BottomNav />
    </div>
  );
}
