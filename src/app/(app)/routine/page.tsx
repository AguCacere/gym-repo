'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button, buttonVariants, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { PageHeader } from '@/components/layout/PageHeader';
import { useAppStore } from '@/lib/store';

export default function RoutinePage() {
  const routine = useAppStore((s) => s.routine);
  const addDay = useAppStore((s) => s.addDay);
  const removeDay = useAppStore((s) => s.removeDay);
  const updateDayName = useAppStore((s) => s.updateDayName);
  const addExercise = useAppStore((s) => s.addExercise);
  const updateExercise = useAppStore((s) => s.updateExercise);
  const removeExercise = useAppStore((s) => s.removeExercise);

  const [editing, setEditing] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8">
      <PageHeader
        eyebrow="Rutina del grupo"
        title={routine.name}
        action={
          <Button variant={editing ? 'primary' : 'secondary'} size="sm" onClick={() => setEditing((v) => !v)}>
            <Pencil size={15} strokeWidth={1.5} />
            {editing ? 'Listo' : 'Editar'}
          </Button>
        }
      />

      <div className="flex flex-col gap-4">
        {routine.days.map((day) => (
          <Card key={day.id}>
            <CardHeader className="flex-row items-center justify-between gap-3">
              {editing ? (
                <Input
                  value={day.dayName}
                  onChange={(e) => updateDayName(day.id, e.target.value)}
                  className="font-serif text-lg"
                />
              ) : (
                <CardTitle>{day.dayName}</CardTitle>
              )}
              {editing && (
                <button
                  onClick={() => removeDay(day.id)}
                  className="shrink-0 p-2 text-charcoal/40 hover:text-charcoal"
                  aria-label="Eliminar día"
                >
                  <Trash2 size={16} strokeWidth={1.5} />
                </button>
              )}
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              {!editing &&
                day.exercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="flex items-center justify-between border-b border-line py-2.5 text-sm last:border-b-0"
                  >
                    <span className="text-charcoal">{ex.name}</span>
                    <span className="text-charcoal/50">
                      {ex.targetSets} × {ex.targetReps}
                    </span>
                  </div>
                ))}

              {editing &&
                day.exercises.map((ex) => (
                  <div key={ex.id} className="flex flex-col gap-2 border-b border-line py-3 last:border-b-0">
                    <div className="flex items-center gap-2">
                      <Input
                        value={ex.name}
                        onChange={(e) => updateExercise(day.id, ex.id, { name: e.target.value })}
                        className="flex-1"
                      />
                      <button
                        onClick={() => removeExercise(day.id, ex.id)}
                        className="shrink-0 p-2 text-charcoal/40 hover:text-charcoal"
                        aria-label="Eliminar ejercicio"
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal/50">
                      <Input
                        type="number"
                        value={ex.targetSets}
                        onChange={(e) =>
                          updateExercise(day.id, ex.id, { targetSets: Number(e.target.value) || 0 })
                        }
                        className="w-16"
                      />
                      <span>series ×</span>
                      <Input
                        value={ex.targetReps}
                        onChange={(e) => updateExercise(day.id, ex.id, { targetReps: e.target.value })}
                        className="w-20"
                      />
                      <span>reps</span>
                    </div>
                  </div>
                ))}

              {editing ? (
                <Button variant="ghost" size="sm" className="mt-3 self-start" onClick={() => addExercise(day.id)}>
                  <Plus size={16} strokeWidth={1.5} /> Agregar ejercicio
                </Button>
              ) : (
                <Link href={`/log/${day.id}`} className={buttonVariants({ size: 'sm', className: 'mt-4 self-start' })}>
                  Registrar
                </Link>
              )}
            </CardContent>
          </Card>
        ))}

        {editing && (
          <Button variant="secondary" onClick={addDay} className="self-start">
            <Plus size={16} strokeWidth={1.5} /> Agregar día
          </Button>
        )}
      </div>
    </div>
  );
}
