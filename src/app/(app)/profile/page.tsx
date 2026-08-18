import { Avatar, Card, CardContent } from '@/components/ui';
import { currentUser } from '@/lib/mock-data';

export default function ProfilePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Tu cuenta</p>
        <h1 className="font-serif text-3xl text-charcoal">Perfil</h1>
      </header>

      <Card>
        <CardContent className="flex items-center gap-4 pt-6">
          <Avatar name={currentUser.displayName} src={currentUser.avatarUrl} size="lg" />
          <div className="flex flex-col">
            <p className="font-serif text-xl text-charcoal">{currentUser.displayName}</p>
            <p className="text-sm text-charcoal/50">@{currentUser.username}</p>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-charcoal/50">
        Editar perfil y cerrar sesión van a estar disponibles cuando conectemos auth (Fase 3).
      </p>
    </div>
  );
}
