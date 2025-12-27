import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWorkout, deleteWorkout } from '../api/workout';
import type { Workout, WorkoutInput } from '../../types/workout';
import { generateMeta } from '../../utils/helpers/common-utils';
import { WORKOUTS_QUERY_KEY } from '../queries/workout';

const enrichWorkoutPayload = (payload: WorkoutInput): Workout => {
  const workoutMeta = generateMeta();

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
    ...payload,
    ...workoutMeta,
    programs,
  };
};

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-workout'],
    mutationFn: createWorkout,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: WORKOUTS_QUERY_KEY.workouts,
        exact: true,
      });

      const previousWorkouts =
        queryClient.getQueryData<Workout[]>(WORKOUTS_QUERY_KEY.workouts) ?? [];

      const optimisticWorkout = enrichWorkoutPayload(variables);

      queryClient.setQueryData(WORKOUTS_QUERY_KEY.workouts, [
        ...previousWorkouts,
        optimisticWorkout,
      ]);

      return { previousWorkouts };
    },
    onError: (error, _variables, onMutateResult) => {
      console.error(`[create-workout] failed :  `, error.message);
      if (onMutateResult?.previousWorkouts) {
        queryClient.setQueryData(WORKOUTS_QUERY_KEY.workouts, onMutateResult.previousWorkouts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WORKOUTS_QUERY_KEY.workouts });
    },
  });
};

export const useDeleteWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-workout'],
    mutationFn: deleteWorkout,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: WORKOUTS_QUERY_KEY.workouts,
        exact: true,
      });

      const { workoutId } = variables;
      const previousWorkouts =
        queryClient.getQueryData<Workout[]>(WORKOUTS_QUERY_KEY.workouts) ?? [];

      const optimisticWorkout = previousWorkouts.filter((workout) => workout.id !== workoutId);

      queryClient.setQueryData(WORKOUTS_QUERY_KEY.workouts, [
        ...previousWorkouts,
        optimisticWorkout,
      ]);

      return { previousWorkouts };
    },
    onError: (error, _variables, onMutateResult) => {
      console.error(`[delete-workout] failed :  `, error.message);
      if (onMutateResult?.previousWorkouts) {
        queryClient.setQueryData(WORKOUTS_QUERY_KEY.workouts, onMutateResult.previousWorkouts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WORKOUTS_QUERY_KEY.workouts });
    },
  });
};
