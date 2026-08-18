import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { mockRoutine } from '@/lib/mock-data';

export default function RoutinePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Rutina del grupo</p>
        <h1 className="font-serif text-3xl text-charcoal">{mockRoutine.name}</h1>
      </header>

      <div className="flex flex-col gap-4">
        {mockRoutine.days.map((day) => (
          <Card key={day.id}>
            <CardHeader>
              <CardTitle>{day.dayName}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col divide-y divide-line">
                {day.exercises.map((ex) => (
                  <li key={ex.id} className="flex items-center justify-between py-2.5 text-sm">
                    <span className="text-charcoal">{ex.name}</span>
                    <span className="text-charcoal/50">
                      {ex.targetSets} × {ex.targetReps}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
