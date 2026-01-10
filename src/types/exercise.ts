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

export type ExercisesQueryState = {
  exercises: Exercise[] | undefined;
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
