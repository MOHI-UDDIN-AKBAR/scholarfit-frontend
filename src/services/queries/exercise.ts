import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getExercises, getExerciseCategories, getExerciseById } from '../api/exercise';
import { EXERCISE_QUERY_KEYS } from '../../utils/constants/queryKeys/exercise';
import type { CategoryType, CursorQuery, PaginationDirection } from '../../types/exercise';
import { ONE_WEEK_MS } from '../../utils/constants/appConstants';

export const useGetExercises = (
  paginationDirection: PaginationDirection,
  name?: string,
  exerciseType?: CategoryType,
  cursor?: CursorQuery
) => {
  return useQuery({
    queryKey: EXERCISE_QUERY_KEYS.exercises(
      cursor ? paginationDirection : undefined,
      name,
      exerciseType,
      cursor ? ('after' in cursor ? cursor.after : cursor.before) : undefined
    ),
    queryFn: () => getExercises(name, exerciseType, cursor),
    placeholderData: keepPreviousData,
    staleTime: ONE_WEEK_MS,
    gcTime: ONE_WEEK_MS,
  });
};

export const useGetExercisesCategories = () =>
  useQuery({
    queryKey: EXERCISE_QUERY_KEYS.exerciseCategories,
    queryFn: getExerciseCategories,
  });

export const useGetExerciseById = (exerciseId: string) =>
  useQuery({
    queryKey: EXERCISE_QUERY_KEYS.detail(exerciseId),
    queryFn: () => getExerciseById(exerciseId),
    enabled: Boolean(exerciseId),
  });
