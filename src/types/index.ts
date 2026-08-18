// Tipos compartidos, alineados al modelo de datos de Supabase. Por ahora
// se usan con datos mock; cuando conectemos las tablas reales, estos tipos
// se pueden regenerar automáticamente con `supabase gen types typescript`.

export interface Profile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface GroupMember {
  profile: Profile;
  role: 'owner' | 'member';
  joinedAt: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  inviteCode: string;
  members: GroupMember[];
}

export interface RoutineExercise {
  id: string;
  name: string;
  targetSets: number;
  targetReps: string;
}

export interface RoutineDay {
  id: string;
  dayName: string;
  exercises: RoutineExercise[];
}

export interface Routine {
  id: string;
  name: string;
  days: RoutineDay[];
}

export interface WorkoutSet {
  exerciseName: string;
  setNumber: number;
  reps: number;
  weightKg: number;
}

export interface FeedPost {
  id: string;
  author: Profile;
  createdAt: string;
  dayName: string;
  exerciseCount: number;
  totalVolumeKg: number;
  likesCount: number;
  commentsCount: number;
  likedByMe: boolean;
}

export interface ProgressStats {
  workoutsThisWeek: number;
  weeklyGoal: number;
  currentStreakWeeks: number;
  totalVolumeKgThisMonth: number;
}
