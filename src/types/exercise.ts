import type { ErrorCode } from '../services/types';

export type CategoryType =
  | 'STRENGTH'
  | 'CARDIO'
  | 'PLYOMETRICS'
  | 'STRETCHING'
  | 'WEIGHTLIFTING'
  | 'YOGA'
  | 'AEROBIC';

export interface ExerciseCategory {
  name: CategoryType;
  imageUrl?: string;
}

export type Exercise = {
  exerciseId: string;
  name: string;
  bodyParts: string[];
  equipments: string[];
  exerciseType: CategoryType;
  targetMuscles: string[];
  secondaryMuscles: string[];
  keywords: string[];
  imageUrl: string;
};

export interface SingleExercise extends Exercise {
  videoUrl: string;
  overview: string;
  instructions: string[];
  exerciseTips: string[];
  variations: string[];
  relatedExerciseIds: string[];
}

export type PaginationDirection = 'next' | 'prev';

export type PaginationMeta = {
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextCursor: string;
  previousCursor?: string;
};

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: { code: ErrorCode; message: string; details?: any; timestamp?: string };
  meta?: {
    timestamp: string;
    requestId?: string;
    pagination?: PaginationMeta;
  };
}

export type ExercisesQueryState = {
  response: ApiResponse<Exercise[]> | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export type CursorParams = {
  [D in PaginationDirection]: {
    direction: D;
    cursor: string;
  };
}[PaginationDirection];

export type CursorQuery = { after: string } | { before: string };
