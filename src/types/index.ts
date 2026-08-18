// Tipos compartidos, alineados al modelo de datos de Supabase. Por ahora
// se usan con datos mock manejados en un store de Zustand; cuando
// conectemos las tablas reales, estos tipos se pueden regenerar
// automáticamente con `supabase gen types typescript`.

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
  id: string;
  exerciseName: string;
  setNumber: number;
  reps: number;
  weightKg: number;
}

export interface WorkoutLog {
  id: string;
  userId: string;
  dayId: string;
  dayName: string;
  date: string;
  sets: WorkoutSet[];
}

export interface PostComment {
  id: string;
  author: Profile;
  content: string;
  createdAt: string;
}

export interface FeedPost {
  id: string;
  workoutLogId: string;
  author: Profile;
  createdAt: string;
  dayName: string;
  exerciseCount: number;
  totalVolumeKg: number;
  likesCount: number;
  likedByMe: boolean;
  comments: PostComment[];
}

export interface ProgressStats {
  workoutsThisWeek: number;
  weeklyGoal: number;
  currentStreakWeeks: number;
  totalVolumeKgThisMonth: number;
}
