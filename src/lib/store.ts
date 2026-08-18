import { create } from 'zustand';
import { currentUser, seedFeedPosts, seedGroup, seedRoutine, seedWorkoutLogs } from './mock-data';
import type { FeedPost, Group, Routine, RoutineExercise, WorkoutLog, WorkoutSet } from '@/types';

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

interface AppState {
  group: Group;
  routine: Routine;
  workoutLogs: WorkoutLog[];
  feedPosts: FeedPost[];

  addDay: () => void;
  removeDay: (dayId: string) => void;
  updateDayName: (dayId: string, name: string) => void;
  addExercise: (dayId: string) => void;
  updateExercise: (dayId: string, exerciseId: string, patch: Partial<RoutineExercise>) => void;
  removeExercise: (dayId: string, exerciseId: string) => void;

  logWorkout: (dayId: string, sets: Omit<WorkoutSet, 'id'>[]) => void;

  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
}

// Store en memoria (sin persistencia) para poder editar rutina, loggear
// entrenamientos y ver el feed reaccionar en vivo, sin backend todavía.
// Se resetea al recargar la página a propósito: es más simple que lidiar
// con hydration mismatches de localStorage en SSR, y de todos modos esto
// se reemplaza por Supabase (con persistencia real) en las próximas fases.
export const useAppStore = create<AppState>((set, get) => ({
  group: seedGroup,
  routine: seedRoutine,
  workoutLogs: seedWorkoutLogs,
  feedPosts: seedFeedPosts,

  addDay: () =>
    set((state) => ({
      routine: {
        ...state.routine,
        days: [
          ...state.routine.days,
          { id: uid('day'), dayName: `Día ${state.routine.days.length + 1}`, exercises: [] },
        ],
      },
    })),

  removeDay: (dayId) =>
    set((state) => ({
      routine: { ...state.routine, days: state.routine.days.filter((d) => d.id !== dayId) },
    })),

  updateDayName: (dayId, name) =>
    set((state) => ({
      routine: {
        ...state.routine,
        days: state.routine.days.map((d) => (d.id === dayId ? { ...d, dayName: name } : d)),
      },
    })),

  addExercise: (dayId) =>
    set((state) => ({
      routine: {
        ...state.routine,
        days: state.routine.days.map((d) =>
          d.id === dayId
            ? {
                ...d,
                exercises: [
                  ...d.exercises,
                  { id: uid('ex'), name: 'Nuevo ejercicio', targetSets: 3, targetReps: '8-10' },
                ],
              }
            : d
        ),
      },
    })),

  updateExercise: (dayId, exerciseId, patch) =>
    set((state) => ({
      routine: {
        ...state.routine,
        days: state.routine.days.map((d) =>
          d.id === dayId
            ? {
                ...d,
                exercises: d.exercises.map((ex) =>
                  ex.id === exerciseId ? { ...ex, ...patch } : ex
                ),
              }
            : d
        ),
      },
    })),

  removeExercise: (dayId, exerciseId) =>
    set((state) => ({
      routine: {
        ...state.routine,
        days: state.routine.days.map((d) =>
          d.id === dayId
            ? { ...d, exercises: d.exercises.filter((ex) => ex.id !== exerciseId) }
            : d
        ),
      },
    })),

  logWorkout: (dayId, setsInput) => {
    const day = get().routine.days.find((d) => d.id === dayId);
    if (!day) return;

    const logId = uid('log');
    const sets: WorkoutSet[] = setsInput.map((s, i) => ({ ...s, id: `${logId}-${i}` }));
    const log: WorkoutLog = {
      id: logId,
      userId: currentUser.id,
      dayId,
      dayName: day.dayName,
      date: new Date().toISOString(),
      sets,
    };

    const exerciseCount = new Set(sets.map((s) => s.exerciseName)).size;
    const totalVolumeKg = sets.reduce((total, s) => total + s.reps * s.weightKg, 0);

    const post: FeedPost = {
      id: uid('post'),
      workoutLogId: logId,
      author: currentUser,
      createdAt: log.date,
      dayName: day.dayName,
      exerciseCount,
      totalVolumeKg,
      likesCount: 0,
      likedByMe: false,
      comments: [],
    };

    set((state) => ({
      workoutLogs: [log, ...state.workoutLogs],
      feedPosts: [post, ...state.feedPosts],
    }));
  },

  toggleLike: (postId) =>
    set((state) => ({
      feedPosts: state.feedPosts.map((p) =>
        p.id === postId
          ? { ...p, likedByMe: !p.likedByMe, likesCount: p.likesCount + (p.likedByMe ? -1 : 1) }
          : p
      ),
    })),

  addComment: (postId, content) =>
    set((state) => ({
      feedPosts: state.feedPosts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: uid('comment'),
                  author: currentUser,
                  content,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : p
      ),
    })),
}));
