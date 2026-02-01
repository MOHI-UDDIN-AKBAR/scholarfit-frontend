export const WORKOUT_QUERY_KEYS = {
  workouts: ['workouts'] as const,
  userWorkout: (userId: string) => ['workouts', 'user-favorite'] as const,
  detail: (id: string) => ['workouts', id] as const,
};
