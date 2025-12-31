export const EXERCISE_QUERY_KEYS = {
  exercises: ['exercises'] as const,
  exerciseCategories: ['exercise-categories'] as const,
  detail: (id: string) => [...EXERCISE_QUERY_KEYS.exercises, id] as const,
};
