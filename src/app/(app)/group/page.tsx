import { Avatar, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { InviteCodeCopy } from '@/components/group/InviteCodeCopy';
import { mockGroup } from '@/lib/mock-data';

export default function GroupPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Grupo</p>
        <h1 className="font-serif text-3xl text-charcoal">{mockGroup.name}</h1>
        <p className="text-sm text-charcoal/60">{mockGroup.description}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Código de invitación</CardTitle>
        </CardHeader>
        <CardContent>
          <InviteCodeCopy code={mockGroup.inviteCode} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Miembros ({mockGroup.members.length})</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {mockGroup.members.map((m) => (
            <div key={m.profile.id} className="flex items-center gap-3">
              <Avatar name={m.profile.displayName} src={m.profile.avatarUrl} size="sm" />
              <div className="flex flex-1 flex-col">
                <p className="text-sm font-medium text-charcoal">{m.profile.displayName}</p>
                <p className="text-xs text-charcoal/50">@{m.profile.username}</p>
              </div>
              {m.role === 'owner' && (
                <span className="text-xs uppercase tracking-wide text-gold-dark">Dueño</span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
