import type { CategoryType, Exercise } from './exercise';

export type WorkoutDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'legs'
  | 'shoulders'
  | 'triceps'
  | 'biceps'
  | 'core'
  | 'full_body';

export interface ExerciseConfiguration {
  id: string;
  exercise: Exercise;
  sets: number;
  reps: string;
  rest: number;
  notes?: string;
  createdAt: string;
}

export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  dayNumber: number;
  restDays: number;
  muscleGroup: MuscleGroup[];
  duration: number;
  exercises: ExerciseConfiguration[];
  createdAt: string;
  isCompleted?: boolean;
}

export interface Workout {
  userId: string;
  id: string;
  name: string;
  description: string;
  category: CategoryType;
  duration: number;
  difficulty: WorkoutDifficulty;
  primaryEquipment: string;
  notes?: string;
  frequency: number;
  rating?: number;
  programs: WorkoutProgram[];
  createdAt: string;
}

export type ExerciseConfigurationInput = Omit<ExerciseConfiguration, 'id' | 'createdAt'>;

export interface ProgramInput extends Omit<WorkoutProgram, 'id' | 'exercises' | 'createdAt'> {
  exercises: ExerciseConfigurationInput[];
}

export interface WorkoutInput extends Omit<Workout, 'id' | 'createdAt' | 'programs' | 'userId'> {
  programs: ProgramInput[];
}
