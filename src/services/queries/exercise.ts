import { useQuery } from '@tanstack/react-query';
import { getExercises, getExerciseCategories, getExerciseById } from '../api/exercise';

export const EXERCISE_KEYS = {
  exercises: ['exercises'] as const,
  exerciseCategories: ['exercise-categories'] as const,
  detail: (id: string) => [...EXERCISE_KEYS.exercises, id] as const,
};

export const useGetExercises = () =>
  useQuery({
    queryKey: EXERCISE_KEYS.exercises,
    queryFn: getExercises,
  });

export const useGetExercisesCategories = () =>
  useQuery({
    queryKey: EXERCISE_KEYS.exerciseCategories,
    queryFn: getExerciseCategories,
  });

export const useGetExerciseById = (exerciseId: string) =>
  useQuery({
    queryKey: EXERCISE_KEYS.detail(exerciseId),
    queryFn: () => getExerciseById(exerciseId),
    enabled: Boolean(exerciseId),
  });
