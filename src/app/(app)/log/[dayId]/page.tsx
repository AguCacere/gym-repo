'use client';

import { use, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { PageHeader } from '@/components/layout/PageHeader';
import { useAppStore } from '@/lib/store';

interface SetInput {
  reps: string;
  weightKg: string;
}

// Client component: 'params' llega como Promise desde Next 15/16, se
// desenvuelve con React `use()` porque un client component no puede ser
// una función async.
export default function LogWorkoutPage({ params }: { params: Promise<{ dayId: string }> }) {
  const { dayId } = use(params);
  const router = useRouter();

  const routine = useAppStore((s) => s.routine);
  const logWorkout = useAppStore((s) => s.logWorkout);
  const day = routine.days.find((d) => d.id === dayId);

  const [setsByExercise, setSetsByExercise] = useState<Record<string, SetInput[]>>(() =>
    Object.fromEntries(
      (day?.exercises ?? []).map((ex) => [
        ex.id,
        Array.from({ length: ex.targetSets }, () => ({ reps: '', weightKg: '' })),
      ])
    )
  );

  if (!day) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-8">
        <p className="text-charcoal/60">No encontramos ese día de la rutina.</p>
        <Button onClick={() => router.push('/routine')}>Volver a rutina</Button>
      </div>
    );
  }

  function updateSet(exerciseId: string, index: number, patch: Partial<SetInput>) {
    setSetsByExercise((prev) => ({
      ...prev,
      [exerciseId]: prev[exerciseId].map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));
  }

  function addSet(exerciseId: string) {
    setSetsByExercise((prev) => ({
      ...prev,
      [exerciseId]: [...(prev[exerciseId] ?? []), { reps: '', weightKg: '' }],
    }));
  }

  function removeSet(exerciseId: string, index: number) {
    setSetsByExercise((prev) => ({
      ...prev,
      [exerciseId]: prev[exerciseId].filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!day) return;

    const sets = day.exercises.flatMap((ex) =>
      (setsByExercise[ex.id] ?? [])
        .filter((s) => s.reps !== '' && s.weightKg !== '')
        .map((s, i) => ({
          exerciseName: ex.name,
          setNumber: i + 1,
          reps: Number(s.reps),
          weightKg: Number(s.weightKg),
        }))
    );

    if (sets.length === 0) return;

    logWorkout(dayId, sets);
    router.push('/feed');
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8">
      <PageHeader eyebrow="Registrar entrenamiento" title={day.dayName} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {day.exercises.map((ex) => (
          <Card key={ex.id}>
            <CardHeader>
              <CardTitle>{ex.name}</CardTitle>
              <p className="text-sm text-charcoal/50">
                Objetivo: {ex.targetSets} × {ex.targetReps}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5">
              {(setsByExercise[ex.id] ?? []).map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 shrink-0 text-sm text-charcoal/40">{i + 1}</span>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="Reps"
                    value={s.reps}
                    onChange={(e) => updateSet(ex.id, i, { reps: e.target.value })}
                  />
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="Kg"
                    value={s.weightKg}
                    onChange={(e) => updateSet(ex.id, i, { weightKg: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => removeSet(ex.id, i)}
                    className="shrink-0 p-2 text-charcoal/40 hover:text-charcoal"
                    aria-label="Eliminar serie"
                  >
                    <Trash2 size={16} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="self-start"
                onClick={() => addSet(ex.id)}
              >
                <Plus size={16} strokeWidth={1.5} /> Agregar serie
              </Button>
            </CardContent>
          </Card>
        ))}

        <Button type="submit">Guardar entrenamiento</Button>
      </form>
    </div>
  );
}
