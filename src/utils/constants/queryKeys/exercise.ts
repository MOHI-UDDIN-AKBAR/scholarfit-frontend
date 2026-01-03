import type { CategoryType, PaginationDirection } from '../../../types/exercise';

export const EXERCISE_QUERY_KEYS = {
  exercises: (
    paginationDirection?: PaginationDirection,
    name?: string,
    exerciseType?: CategoryType,
    cursor?: string
  ) => ['exercises', { paginationDirection, name, exerciseType, cursor }] as const,
  exerciseCategories: ['exercise-categories'] as const,
  detail: (id: string) => ['exercises', id] as const,
};
