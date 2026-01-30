export interface SessionStats {
  totalSessions: number;
  totalVolume: number;
  averageVolume: number;
  mostFrequentWorkout?: string;
  currentStreak: number;
  longestStreak: number;
  weeklyFrequency: number;
  monthlyFrequency: number;
  volumeTrend: VolumeTrend[];
  weeklyAverageVolume: number;
  volumeChangePercentage: number;
  peakVolume: number;
  peakVolumeWeek: string;
}

export interface VolumeTrend {
  weekLabel: string;
  totalVolume: number;
  weekNumber: number;
  startDate: string;
  endDate: string;
  averageDailyVolume?: number;
  daysWithSessions?: number;
}

export type StreakInfo = {
  currentStreak: number;
  longestStreak: number;
  lastUpdated: string;
};

export type ExerciseHistory = {
  id: string;
  set: number;
  reps: string;
  restTime: number;
  weight: number;
  RPE: string;
  setNotes?: string;
};

export type ProgramExercise = {
  exerciseId: string;
  exerciseHistory: ExerciseHistory[];
  completionNotes?: string;
  inProgress?: boolean;
  completedAt?: string;
  isCompleted: boolean;
};

export type SessionWorkoutProgram = {
  programId: string;
  programName?: string;
  programNotes?: string;
  exercises: ProgramExercise[];
};

export type WorkoutHistoryInput = {
  userId: string;
  workoutId: string;
  workoutName?: string;
  program: SessionWorkoutProgram[];
  sessionVolume: number;
  sessionDuration?: number;
  sessionNotes?: string;
  streakInfo?: StreakInfo;
  completedAt: string;
};

export interface WorkoutHistoryEntry extends Omit<WorkoutHistoryInput, 'userId'> {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SessionWorkoutHistory {
  userId: string;
  totalTrainingVolume: number;
  totalSessions: number;
  averageSessionVolume: number;
  streakInfo?: StreakInfo;
  sessions: WorkoutHistoryEntry[];
  lastSessionDate?: string;
}

export type CompletedSessionProgram = {
  programId: string;
  programName: string;
  exerciseAmount: number;
  completedAt: string;
};
