import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSession } from '../api/session';
import { SESSION_KEYS } from '../queries/session';

export const useAddSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: SESSION_KEYS.createSession,
    mutationFn: createSession,
    onSuccess: () => {
      console.log(`${SESSION_KEYS.createSession} successfully added!`);
    },
    onError: (error) => {
      console.error(`${SESSION_KEYS.createSession} failed : `, error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SESSION_KEYS.sessionHistory });
      queryClient.invalidateQueries({ queryKey: SESSION_KEYS.sessionStats });
      queryClient.invalidateQueries({ queryKey: SESSION_KEYS.recentSession });
      queryClient.invalidateQueries({ queryKey: SESSION_KEYS.userStreak });
      queryClient.invalidateQueries({ queryKey: SESSION_KEYS.volumeTrend });
    },
  });
};
