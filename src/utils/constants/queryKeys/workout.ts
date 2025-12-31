export const WORKOUT_QUERY_KEYS = {
  workouts: ['workouts'] as const,
  detail: (id: string) => [...WORKOUT_QUERY_KEYS.workouts, id] as const,
};
