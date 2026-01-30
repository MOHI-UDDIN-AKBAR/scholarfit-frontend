import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSession } from '../api/session';
import { SESSION_QUERY_KEYS } from '../../utils/constants/queryKeys/session';
import type { ApiErrorResponse } from '../../types/api';
import type { AxiosError } from 'axios';
import type { WorkoutHistoryEntry, WorkoutHistoryInput } from '../../types/session';

export const useCreateSessionHistory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    WorkoutHistoryEntry,
    AxiosError<ApiErrorResponse>,
    {
      sessionPayload: WorkoutHistoryInput;
    }
  >({
    mutationKey: SESSION_QUERY_KEYS.createSession,
    mutationFn: createSession,
    onSuccess: () => {
      console.log(`${SESSION_QUERY_KEYS.createSession} successfully added!`);
    },
    onError: (error) => {
      console.error(
        `${SESSION_QUERY_KEYS.createSession} failed : `,
        error.response?.data?.error?.message ?? error.message
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEYS.sessionHistory });
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEYS.sessionStats });
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEYS.recentSession });
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEYS.userStreak });
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEYS.volumeTrend });
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEYS.completedSessionPrograms });
    },
  });
};
