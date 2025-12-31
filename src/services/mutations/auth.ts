import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register, login, logout, refreshAccessToken } from '../api/auth';
import type { NavigateFunction } from 'react-router';
import { reduxTokenManager } from '../axios/reduxTokenManager';
import { AUTH_QUERY_KEYS } from '../../utils/constants/queryKeys/auth';

export const useRegisterUser = (navigate: NavigateFunction) => {
  return useMutation({
    mutationKey: AUTH_QUERY_KEYS.register,
    mutationFn: register,
    onSuccess: (data) => {
      console.info(
        `[${AUTH_QUERY_KEYS.register}] user ${data.user.id} is registered successfully!`
      );
      navigate('/login');
    },
    onError: (error) => {
      console.error(`[${AUTH_QUERY_KEYS.register}] user failed to register : `, error.message);
    },
  });
};

export const useLogin = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AUTH_QUERY_KEYS.login,
    mutationFn: login,
    onSuccess: ({ user, accessToken }) => {
      console.info(`[${AUTH_QUERY_KEYS.login}] user ${user.id} is logged in successfully!`);
      reduxTokenManager.setAccessToken(accessToken);
      navigate('/');
    },
    onError: (error) => {
      console.error(`[${AUTH_QUERY_KEYS.login}] user failed to logged in : `, error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.userProfile });
    },
  });
};

export const useLogout = (navigate: NavigateFunction) =>
  useMutation({
    mutationKey: AUTH_QUERY_KEYS.logout,
    mutationFn: logout,
    onSuccess: () => {
      console.info(`[${AUTH_QUERY_KEYS.logout}] Logged out successfully!`);
      navigate('/');
    },
    onError: (error) => {
      console.error(`[${AUTH_QUERY_KEYS.logout}] failed to logged out: `, error.message);
    },
  });

export const useRefreshToken = () =>
  useMutation({
    mutationKey: AUTH_QUERY_KEYS.refresh,
    mutationFn: refreshAccessToken,
    onSuccess: () => {
      console.info(`[${AUTH_QUERY_KEYS.refresh}] token refreshed successfully!`);
    },
    onError: (error) => {
      console.error(`[${AUTH_QUERY_KEYS.refresh}] failed to refresh token : `, error.message);
    },
  });
