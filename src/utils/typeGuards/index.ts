import type { ProgressCount } from '../../store/slices/workout-slices/workoutSessionSlice';

export const isProgressCount = (value: unknown): value is ProgressCount => {
  return typeof value === 'object' && value !== null && 'completed' in value && 'outOf' in value;
};
