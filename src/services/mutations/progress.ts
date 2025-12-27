import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBodyWeightEntry, createBodyMeasurementEntry } from '../api/progress';
import { PROGRESS_KEYS } from '../queries/progress';
import type {
  BodyMeasurementEntry,
  BodyWeightEntry,
  BodyWeightHistory,
  CreateBodyMeasurementInput,
  CreateBodyWeightInput,
} from '../../types/progress';
import { generateMeta } from '../../utils/helpers/common-utils';

const toBodyWeightEntry = (entry: CreateBodyWeightInput): BodyWeightEntry => {
  const { userId, ...rest } = entry;
  return { ...rest, ...generateMeta() };
};

const toBodyMeasurementEntry = (entry: CreateBodyMeasurementInput): BodyMeasurementEntry => {
  const { userId, ...rest } = entry;
  return { ...rest, ...generateMeta() };
};

export const useAddBodyWeightEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: PROGRESS_KEYS.createBodyWeightEntry,
    mutationFn: createBodyWeightEntry,

    onMutate: async (variables) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: PROGRESS_KEYS.bodyWeightHistory }),
        queryClient.cancelQueries({ queryKey: PROGRESS_KEYS.latestBodyWeight }),
      ]);

      const previousHistory = queryClient.getQueryData<BodyWeightHistory>(
        PROGRESS_KEYS.bodyWeightHistory
      );

      const optimisticEntry = toBodyWeightEntry(variables);

      const previousLatest = queryClient.getQueryData<BodyWeightEntry>(
        PROGRESS_KEYS.latestBodyWeight
      );

      if (previousHistory) {
        queryClient.setQueryData(PROGRESS_KEYS.bodyWeightHistory, {
          ...previousHistory,
          entries: [...previousHistory?.entries, optimisticEntry],
        });
      }

      queryClient.setQueryData(PROGRESS_KEYS.latestBodyWeight, optimisticEntry);

      return { previousLatest, previousHistory };
    },
    onError: (error, _variables, onMutateResult) => {
      console.error(`${PROGRESS_KEYS.createBodyWeightEntry} failed :  `, error.message);
      if (onMutateResult?.previousHistory) {
        queryClient.setQueryData(PROGRESS_KEYS.bodyWeightHistory, onMutateResult.previousHistory);
      }

      if (onMutateResult?.previousLatest) {
        queryClient.setQueryData(PROGRESS_KEYS.latestBodyWeight, onMutateResult.previousLatest);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROGRESS_KEYS.bodyWeightHistory });
      queryClient.invalidateQueries({ queryKey: PROGRESS_KEYS.latestBodyWeight });
    },
  });
};

export const useAddMeasurementEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: PROGRESS_KEYS.createBodyMeasurementEntry,
    mutationFn: createBodyMeasurementEntry,

    onMutate: async (variables) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: PROGRESS_KEYS.bodyMeasurementHistory }),
        queryClient.cancelQueries({ queryKey: PROGRESS_KEYS.latestBodyMeasurement }),
      ]);

      const previousHistory = queryClient.getQueryData<BodyWeightHistory>(
        PROGRESS_KEYS.bodyMeasurementHistory
      );

      const optimisticEntry = toBodyMeasurementEntry(variables);

      const previousLatest = queryClient.getQueryData<BodyWeightEntry>(
        PROGRESS_KEYS.latestBodyMeasurement
      );

      if (previousHistory) {
        queryClient.setQueryData(PROGRESS_KEYS.bodyMeasurementHistory, {
          ...previousHistory,
          entries: [...previousHistory?.entries, optimisticEntry],
        });
      }

      queryClient.setQueryData(PROGRESS_KEYS.latestBodyMeasurement, optimisticEntry);

      return { previousLatest, previousHistory };
    },
    onError: (error, _variables, onMutateResult) => {
      console.error(`${PROGRESS_KEYS.createBodyMeasurementEntry} failed :  `, error.message);
      if (onMutateResult?.previousHistory) {
        queryClient.setQueryData(
          PROGRESS_KEYS.bodyMeasurementHistory,
          onMutateResult.previousHistory
        );
      }

      if (onMutateResult?.previousLatest) {
        queryClient.setQueryData(
          PROGRESS_KEYS.latestBodyMeasurement,
          onMutateResult.previousLatest
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROGRESS_KEYS.bodyMeasurementHistory });
      queryClient.invalidateQueries({ queryKey: PROGRESS_KEYS.latestBodyMeasurement });
    },
  });
};
