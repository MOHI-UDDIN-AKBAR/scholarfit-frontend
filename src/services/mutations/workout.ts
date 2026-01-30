import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addWorkoutToUserList, createWorkout, removeWorkout } from '../api/workout';
import type { Workout, WorkoutInput } from '../../types/workout';
import { generateMeta } from '../../utils/helpers/common-utils';
import { WORKOUT_QUERY_KEYS } from '../../utils/constants/queryKeys/workout';
import type { ApiErrorResponse } from '../../types/api';
import type { AxiosError } from 'axios';
import store from '../../store/store';
import { DASHBOARD_QUERY_KEYS } from '../../utils/constants/queryKeys/dashboard';

const enrichWorkoutPayload = (payload: WorkoutInput): Workout => {
  const workoutMeta = generateMeta();
  const userId = store.getState().auth.userInfo?.id ?? '';

  const programs = payload.programs.map((program) => {
    const programMeta = generateMeta();

    return {
      ...program,
      ...programMeta,
      exercises: program.exercises.map((exercise) => ({
        ...exercise,
        ...generateMeta(),
      })),
    };
  });

  return {
    userId,
    ...payload,
    ...workoutMeta,
    programs,
  };
};

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Workout,
    AxiosError<ApiErrorResponse>,
    WorkoutInput,
    { previousWorkouts: Workout[] }
  >({
    mutationKey: ['create-workout'],
    mutationFn: createWorkout,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: WORKOUT_QUERY_KEYS.workouts,
        exact: true,
      });

      const previousWorkouts =
        queryClient.getQueryData<Workout[]>(WORKOUT_QUERY_KEYS.workouts) ?? [];

      const optimisticWorkout = enrichWorkoutPayload(variables);

      queryClient.setQueryData(WORKOUT_QUERY_KEYS.workouts, [
        ...previousWorkouts,
        optimisticWorkout,
      ]);

      return { previousWorkouts };
    },
    onError: (error, _variables, context) => {
      console.error(
        `[create-workout] failed :  `,
        error.response?.data?.error?.message ?? error.message
      );
      if (context?.previousWorkouts) {
        queryClient.setQueryData(WORKOUT_QUERY_KEYS.workouts, context.previousWorkouts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WORKOUT_QUERY_KEYS.workouts });
    },
  });
};

export const useAddWorkout = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    Workout,
    AxiosError<ApiErrorResponse>,
    string,
    { previousFavoritesSnapshot: Workout[] }
  >({
    mutationKey: ['favorite-workouts', userId],
    mutationFn: addWorkoutToUserList,

    onMutate: async (workoutId) => {
      await queryClient.cancelQueries({
        queryKey: WORKOUT_QUERY_KEYS.userWorkout(userId),
      });

      const previousFavoritesSnapshot =
        queryClient.getQueryData<Workout[]>(WORKOUT_QUERY_KEYS.userWorkout(userId)) ?? [];

      const workoutCatalog = queryClient.getQueryData<Workout[]>(WORKOUT_QUERY_KEYS.workouts) ?? [];

      const optimisticFavorite = workoutCatalog.find((workout) => workout.id === workoutId);

      const alreadyExists = previousFavoritesSnapshot.some((workout) => workout.id === workoutId);

      if (!optimisticFavorite || alreadyExists) {
        return { previousFavoritesSnapshot };
      }

      queryClient.setQueryData<Workout[]>(WORKOUT_QUERY_KEYS.userWorkout(userId), [
        ...previousFavoritesSnapshot,
        optimisticFavorite,
      ]);

      return { previousFavoritesSnapshot };
    },
    onError: (error, _variables, context) => {
      console.error(
        `[add-workout-to-favorites] failed :  `,
        error.response?.data?.error?.message ?? error.message
      );
      if (context?.previousFavoritesSnapshot) {
        queryClient.setQueryData(
          WORKOUT_QUERY_KEYS.userWorkout(userId),
          context.previousFavoritesSnapshot
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WORKOUT_QUERY_KEYS.userWorkout(userId) });
      queryClient.invalidateQueries({ queryKey: WORKOUT_QUERY_KEYS.workouts });
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEYS.dashboardStats });
    },
  });
};

export const useRemoveWorkout = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    boolean,
    AxiosError<ApiErrorResponse>,
    { workoutId: string },
    { previousFavoritesSnapshot: Workout[] }
  >({
    mutationKey: ['delete-workout'],
    mutationFn: removeWorkout,

    onMutate: async ({ workoutId }) => {
      await queryClient.cancelQueries({
        queryKey: WORKOUT_QUERY_KEYS.userWorkout(userId),
        exact: true,
      });

      const previousFavoritesSnapshot =
        queryClient.getQueryData<Workout[]>(WORKOUT_QUERY_KEYS.userWorkout(userId)) ?? [];

      const isExist = previousFavoritesSnapshot.some((workout) => workout.id === workoutId);

      if (!isExist) return { previousFavoritesSnapshot };

      queryClient.setQueryData<Workout[]>(
        WORKOUT_QUERY_KEYS.userWorkout(userId),
        previousFavoritesSnapshot
      );

      return { previousFavoritesSnapshot };
    },
    onError: (error, _variables, context) => {
      console.error(
        `[delete-workout] failed :  `,
        error.response?.data?.error?.message ?? error.message
      );
      if (context?.previousFavoritesSnapshot) {
        queryClient.setQueryData(
          WORKOUT_QUERY_KEYS.userWorkout(userId),
          context.previousFavoritesSnapshot
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WORKOUT_QUERY_KEYS.userWorkout(userId) });
    },
  });
};
