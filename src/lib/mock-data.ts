import type { FeedPost, Group, ProgressStats, Profile, Routine } from '@/types';

// Datos hardcodeados para poder navegar la app antes de tener auth y
// queries reales a Supabase. Cada función acá se va a reemplazar por un
// fetch a la base en las fases de Grupos/Rutinas/Feed.

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

export const mockGroup: Group = {
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

export const mockRoutine: Routine = {
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

export const mockFeedPosts: FeedPost[] = [
  {
    id: 'p1',
    author: members[1],
    createdAt: '2026-08-17T18:30:00Z',
    dayName: 'Día 1 — Push',
    exerciseCount: 4,
    totalVolumeKg: 3120,
    likesCount: 4,
    commentsCount: 2,
    likedByMe: true,
  },
  {
    id: 'p2',
    author: members[2],
    createdAt: '2026-08-17T14:05:00Z',
    dayName: 'Día 3 — Legs',
    exerciseCount: 3,
    totalVolumeKg: 4580,
    likesCount: 2,
    commentsCount: 0,
    likedByMe: false,
  },
  {
    id: 'p3',
    author: currentUser,
    createdAt: '2026-08-16T20:15:00Z',
    dayName: 'Día 2 — Pull',
    exerciseCount: 3,
    totalVolumeKg: 2760,
    likesCount: 6,
    commentsCount: 3,
    likedByMe: false,
  },
  {
    id: 'p4',
    author: members[3],
    createdAt: '2026-08-16T09:40:00Z',
    dayName: 'Día 4 — Full Body',
    exerciseCount: 3,
    totalVolumeKg: 3890,
    likesCount: 3,
    commentsCount: 1,
    likedByMe: false,
  },
];

export const mockProgressStats: ProgressStats = {
  workoutsThisWeek: 3,
  weeklyGoal: 4,
  currentStreakWeeks: 6,
  totalVolumeKgThisMonth: 42300,
};
