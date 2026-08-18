import { Card } from '@/components/ui';
import { mockProgressStats } from '@/lib/mock-data';

const stats = [
  {
    label: 'Entrenamientos esta semana',
    value: `${mockProgressStats.workoutsThisWeek} / ${mockProgressStats.weeklyGoal}`,
  },
  { label: 'Racha actual', value: `${mockProgressStats.currentStreakWeeks} semanas` },
  {
    label: 'Volumen del mes',
    value: `${mockProgressStats.totalVolumeKgThisMonth.toLocaleString('es-AR')} kg`,
  },
];

// Sin gráficos todavía (eso es Fase 7, con victory-native o similar).
// Por ahora números simples para poder navegar la sección.
export default function ProgressPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Tu evolución</p>
        <h1 className="font-serif text-3xl text-charcoal">Progreso</h1>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="flex flex-col gap-1 p-6">
            <p className="font-serif text-3xl text-charcoal">{s.value}</p>
            <p className="text-sm text-charcoal/60">{s.label}</p>
          </Card>
        ))}
      </div>

      <p className="text-sm text-charcoal/50">
        Los gráficos de evolución por ejercicio llegan en una fase posterior.
      </p>
    </div>
  );
}
