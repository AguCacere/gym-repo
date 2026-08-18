import type { FeedPost, Group, ProgressStats, Profile, Routine, WorkoutLog } from '@/types';

// Datos semilla para el store de Zustand. Sirven para poder navegar la app
// antes de tener auth y queries reales a Supabase. Cada uno de estos se va
// a reemplazar por un fetch a la base en las fases de Grupos/Rutinas/Feed.

export const currentUser: Profile = {
  id: 'me',
  username: 'agus.cc',
  displayName: 'Agustín Cáceres',
  avatarUrl: null,
};

const members: Profile[] = [
  currentUser,
  { id: 'u2', username: 'juli.fit', displayName: 'Julieta Gómez', avatarUrl: null },
  { id: 'u3', username: 'martin_g', displayName: 'Martín Guerra', avatarUrl: null },
  { id: 'u4', username: 'sofi.lp', displayName: 'Sofía López', avatarUrl: null },
];

export const seedGroup: Group = {
  id: 'g1',
  name: 'Fuerza & Disciplina',
  description: 'Grupo de entrenamiento de fuerza, 4 días por semana.',
  inviteCode: 'FYD-4821',
  members: [
    { profile: members[0], role: 'owner', joinedAt: '2026-05-01' },
    { profile: members[1], role: 'member', joinedAt: '2026-05-03' },
    { profile: members[2], role: 'member', joinedAt: '2026-05-10' },
    { profile: members[3], role: 'member', joinedAt: '2026-06-02' },
  ],
};

export const seedRoutine: Routine = {
  id: 'r1',
  name: 'Rutina de fuerza — 4 días',
  days: [
    {
      id: 'd1',
      dayName: 'Día 1 — Push',
      exercises: [
        { id: 'e1', name: 'Press banca', targetSets: 4, targetReps: '6-8' },
        { id: 'e2', name: 'Press militar', targetSets: 3, targetReps: '8-10' },
        { id: 'e3', name: 'Fondos en paralelas', targetSets: 3, targetReps: '10-12' },
        { id: 'e4', name: 'Elevaciones laterales', targetSets: 3, targetReps: '12-15' },
      ],
    },
    {
      id: 'd2',
      dayName: 'Día 2 — Pull',
      exercises: [
        { id: 'e5', name: 'Dominadas', targetSets: 4, targetReps: '6-10' },
        { id: 'e6', name: 'Remo con barra', targetSets: 4, targetReps: '8-10' },
        { id: 'e7', name: 'Curl de bíceps', targetSets: 3, targetReps: '10-12' },
      ],
    },
    {
      id: 'd3',
      dayName: 'Día 3 — Legs',
      exercises: [
        { id: 'e8', name: 'Sentadilla', targetSets: 4, targetReps: '5-8' },
        { id: 'e9', name: 'Peso muerto rumano', targetSets: 3, targetReps: '8-10' },
        { id: 'e10', name: 'Zancadas', targetSets: 3, targetReps: '10-12' },
      ],
    },
    {
      id: 'd4',
      dayName: 'Día 4 — Full Body',
      exercises: [
        { id: 'e11', name: 'Peso muerto', targetSets: 3, targetReps: '5' },
        { id: 'e12', name: 'Press inclinado', targetSets: 3, targetReps: '8-10' },
        { id: 'e13', name: 'Remo bajo', targetSets: 3, targetReps: '10-12' },
      ],
    },
  ],
};

function sets(exerciseName: string, count: number, reps: number, weightKg: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${exerciseName}-${i}`,
    exerciseName,
    setNumber: i + 1,
    reps,
    weightKg,
  }));
}

export const seedWorkoutLogs: WorkoutLog[] = [
  {
    id: 'wl1',
    userId: members[1].id,
    dayId: 'd1',
    dayName: 'Día 1 — Push',
    date: '2026-08-17T18:30:00Z',
    sets: [
      ...sets('Press banca', 4, 7, 80),
      ...sets('Press militar', 3, 9, 40),
      ...sets('Fondos en paralelas', 3, 11, 10),
      ...sets('Elevaciones laterales', 3, 14, 8),
    ],
  },
  {
    id: 'wl2',
    userId: members[2].id,
    dayId: 'd3',
    dayName: 'Día 3 — Legs',
    date: '2026-08-17T14:05:00Z',
    sets: [
      ...sets('Sentadilla', 4, 6, 120),
      ...sets('Peso muerto rumano', 3, 9, 90),
      ...sets('Zancadas', 3, 11, 20),
    ],
  },
  {
    id: 'wl3',
    userId: currentUser.id,
    dayId: 'd2',
    dayName: 'Día 2 — Pull',
    date: '2026-08-16T20:15:00Z',
    sets: [
      ...sets('Dominadas', 4, 8, 0),
      ...sets('Remo con barra', 4, 9, 60),
      ...sets('Curl de bíceps', 3, 11, 14),
    ],
  },
  {
    id: 'wl4',
    userId: members[3].id,
    dayId: 'd4',
    dayName: 'Día 4 — Full Body',
    date: '2026-08-16T09:40:00Z',
    sets: [
      ...sets('Peso muerto', 3, 5, 140),
      ...sets('Press inclinado', 3, 9, 50),
      ...sets('Remo bajo', 3, 11, 55),
    ],
  },
];

function volumeOf(log: WorkoutLog) {
  return log.sets.reduce((total, s) => total + s.reps * s.weightKg, 0);
}

function exerciseCountOf(log: WorkoutLog) {
  return new Set(log.sets.map((s) => s.exerciseName)).size;
}

export const seedFeedPosts: FeedPost[] = [
  {
    id: 'p1',
    workoutLogId: 'wl1',
    author: members[1],
    createdAt: seedWorkoutLogs[0].date,
    dayName: seedWorkoutLogs[0].dayName,
    exerciseCount: exerciseCountOf(seedWorkoutLogs[0]),
    totalVolumeKg: volumeOf(seedWorkoutLogs[0]),
    likesCount: 4,
    likedByMe: true,
    comments: [
      {
        id: 'c1',
        author: members[2],
        content: 'Con todo con el press banca 💪',
        createdAt: '2026-08-17T19:00:00Z',
      },
      {
        id: 'c2',
        author: currentUser,
        content: 'Buen ritmo esta semana',
        createdAt: '2026-08-17T19:20:00Z',
      },
    ],
  },
  {
    id: 'p2',
    workoutLogId: 'wl2',
    author: members[2],
    createdAt: seedWorkoutLogs[1].date,
    dayName: seedWorkoutLogs[1].dayName,
    exerciseCount: exerciseCountOf(seedWorkoutLogs[1]),
    totalVolumeKg: volumeOf(seedWorkoutLogs[1]),
    likesCount: 2,
    likedByMe: false,
    comments: [],
  },
  {
    id: 'p3',
    workoutLogId: 'wl3',
    author: currentUser,
    createdAt: seedWorkoutLogs[2].date,
    dayName: seedWorkoutLogs[2].dayName,
    exerciseCount: exerciseCountOf(seedWorkoutLogs[2]),
    totalVolumeKg: volumeOf(seedWorkoutLogs[2]),
    likesCount: 6,
    likedByMe: false,
    comments: [
      {
        id: 'c3',
        author: members[1],
        content: '¡Vamos! ¿Cómo veniste de dominadas?',
        createdAt: '2026-08-16T21:00:00Z',
      },
    ],
  },
  {
    id: 'p4',
    workoutLogId: 'wl4',
    author: members[3],
    createdAt: seedWorkoutLogs[3].date,
    dayName: seedWorkoutLogs[3].dayName,
    exerciseCount: exerciseCountOf(seedWorkoutLogs[3]),
    totalVolumeKg: volumeOf(seedWorkoutLogs[3]),
    likesCount: 3,
    likedByMe: false,
    comments: [],
  },
];

export const seedProgressStats: ProgressStats = {
  workoutsThisWeek: 3,
  weeklyGoal: 4,
  currentStreakWeeks: 6,
  totalVolumeKgThisMonth: 42300,
};
