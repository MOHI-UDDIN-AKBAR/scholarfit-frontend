import { useQuery } from '@tanstack/react-query';
import { getWorkoutList, getWorkoutById, getUserWorkoutList } from '../api/workout';
import { WORKOUT_QUERY_KEYS } from '../../utils/constants/queryKeys/workout';

export const useGetWorkoutList = () =>
  useQuery({
    queryKey: WORKOUT_QUERY_KEYS.workouts,
    queryFn: getWorkoutList,
  });

export const useGetUserWorkoutList = (userId: string) =>
  useQuery({
    queryKey: WORKOUT_QUERY_KEYS.userWorkout(userId),
    queryFn: getUserWorkoutList,
  });

export const useGetWorkoutById = (workoutId: string) =>
  useQuery({
    queryKey: WORKOUT_QUERY_KEYS.detail(workoutId),
    queryFn: () => getWorkoutById(workoutId),
    enabled: Boolean(workoutId),
  });
