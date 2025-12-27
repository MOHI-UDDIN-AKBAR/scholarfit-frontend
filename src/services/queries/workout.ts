import { useQuery } from '@tanstack/react-query';
import { getWorkoutList, getWorkoutById } from '../api/workout';

export const WORKOUTS_QUERY_KEY = {
  workouts: ['workouts'] as const,
  detail: (id: string) => [...WORKOUTS_QUERY_KEY.workouts, id] as const,
};

export const useGetWorkoutList = () =>
  useQuery({
    queryKey: WORKOUTS_QUERY_KEY.workouts,
    queryFn: getWorkoutList,
  });

export const useGetWorkoutById = (workoutId: string) =>
  useQuery({
    queryKey: WORKOUTS_QUERY_KEY.detail(workoutId),
    queryFn: () => getWorkoutById(workoutId),
    enabled: Boolean(workoutId),
  });
