import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBodyWeightEntry, createBodyMeasurementEntry } from '../api/progress';
import type {
  BodyMeasurementEntry,
  BodyMeasurementHistory,
  BodyWeightEntry,
  BodyWeightHistory,
  CreateBodyMeasurementInput,
  CreateBodyWeightInput,
} from '../../types/progress';
import { generateMeta } from '../../utils/helpers/common-utils';
import { PROGRESS_QUERY_KEYS } from '../../utils/constants/queryKeys/progress';
import type { ApiErrorResponse } from '../../types/api';
import type { AxiosError } from 'axios';

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

  return useMutation<
    BodyWeightEntry,
    AxiosError<ApiErrorResponse>,
    CreateBodyWeightInput,
    {
      previousHistory: BodyWeightHistory | undefined;
      previousLatest: BodyWeightEntry | undefined;
    }
  >({
    mutationKey: PROGRESS_QUERY_KEYS.createBodyWeightEntry,
    mutationFn: createBodyWeightEntry,
    onMutate: async (variables) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: PROGRESS_QUERY_KEYS.bodyWeightHistory }),
        queryClient.cancelQueries({ queryKey: PROGRESS_QUERY_KEYS.latestBodyWeight }),
      ]);

      const previousHistory = queryClient.getQueryData<BodyWeightHistory>(
        PROGRESS_QUERY_KEYS.bodyWeightHistory
      );

      const optimisticEntry = toBodyWeightEntry(variables);

      const previousLatest = queryClient.getQueryData<BodyWeightEntry>(
        PROGRESS_QUERY_KEYS.latestBodyWeight
      );

      if (previousHistory) {
        queryClient.setQueryData(PROGRESS_QUERY_KEYS.bodyWeightHistory, {
          ...previousHistory,
          entries: [...previousHistory?.entries, optimisticEntry],
        });
      }

      queryClient.setQueryData(PROGRESS_QUERY_KEYS.latestBodyWeight, optimisticEntry);

      return { previousLatest, previousHistory };
    },
    onError: (error, _variables, context) => {
      console.error(
        `${PROGRESS_QUERY_KEYS.createBodyWeightEntry} failed :  `,
        error.response?.data?.error?.message ?? error.message
      );
      if (context?.previousHistory) {
        queryClient.setQueryData(PROGRESS_QUERY_KEYS.bodyWeightHistory, context.previousHistory);
      }

      if (context?.previousLatest) {
        queryClient.setQueryData(PROGRESS_QUERY_KEYS.latestBodyWeight, context.previousLatest);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROGRESS_QUERY_KEYS.userProgress });
      queryClient.invalidateQueries({ queryKey: PROGRESS_QUERY_KEYS.bodyWeightHistory });
      queryClient.invalidateQueries({ queryKey: PROGRESS_QUERY_KEYS.latestBodyWeight });
    },
  });
};

export const useAddMeasurementEntry = () => {
  const queryClient = useQueryClient();

  return useMutation<
    BodyMeasurementEntry,
    AxiosError<ApiErrorResponse>,
    CreateBodyMeasurementInput,
    {
      previousLatest: BodyMeasurementEntry | undefined;
      previousHistory: BodyMeasurementHistory | undefined;
    }
  >({
    mutationKey: PROGRESS_QUERY_KEYS.createBodyMeasurementEntry,
    mutationFn: createBodyMeasurementEntry,

    onMutate: async (variables) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: PROGRESS_QUERY_KEYS.bodyMeasurementHistory }),
        queryClient.cancelQueries({ queryKey: PROGRESS_QUERY_KEYS.latestBodyMeasurement }),
      ]);

      const previousHistory = queryClient.getQueryData<BodyMeasurementHistory>(
        PROGRESS_QUERY_KEYS.bodyMeasurementHistory
      );

      const optimisticEntry = toBodyMeasurementEntry(variables);

      const previousLatest = queryClient.getQueryData<BodyMeasurementEntry>(
        PROGRESS_QUERY_KEYS.latestBodyMeasurement
      );

      if (previousHistory) {
        queryClient.setQueryData(PROGRESS_QUERY_KEYS.bodyMeasurementHistory, {
          ...previousHistory,
          entries: [...previousHistory?.entries, optimisticEntry],
        });
      }

      queryClient.setQueryData(PROGRESS_QUERY_KEYS.latestBodyMeasurement, optimisticEntry);

      return { previousLatest, previousHistory };
    },
    onError: (error, _variables, context) => {
      console.error(
        `${PROGRESS_QUERY_KEYS.createBodyMeasurementEntry} failed :  `,
        error.response?.data?.error?.message ?? error.message
      );
      if (context?.previousHistory) {
        queryClient.setQueryData(
          PROGRESS_QUERY_KEYS.bodyMeasurementHistory,
          context.previousHistory
        );
      }

      if (context?.previousLatest) {
        queryClient.setQueryData(PROGRESS_QUERY_KEYS.latestBodyMeasurement, context.previousLatest);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROGRESS_QUERY_KEYS.userProgress });
      queryClient.invalidateQueries({ queryKey: PROGRESS_QUERY_KEYS.bodyMeasurementHistory });
      queryClient.invalidateQueries({ queryKey: PROGRESS_QUERY_KEYS.latestBodyMeasurement });
    },
  });
};
