'use client';

import { Avatar, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/layout/PageHeader';
import { InviteCodeCopy } from '@/components/group/InviteCodeCopy';
import { useAppStore } from '@/lib/store';

export default function GroupPage() {
  const group = useAppStore((s) => s.group);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8">
      <PageHeader eyebrow="Grupo" title={group.name} description={group.description} />

      <Card>
        <CardHeader>
          <CardTitle>Código de invitación</CardTitle>
        </CardHeader>
        <CardContent>
          <InviteCodeCopy code={group.inviteCode} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Miembros ({group.members.length})</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {group.members.map((m) => (
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
