import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register, login, logout } from '../api/auth';
import type { NavigateFunction } from 'react-router';
import { AUTH_QUERY_KEYS } from '../../utils/constants/queryKeys/auth';
import store from '../../store/store';
import { loginSuccess } from '../../store/slices/authSlice';
import type { AuthResponse, LoginFormState, RegisterFormData, UserProfile } from '../../types/auth';
import type { ApiErrorResponse } from '../../types/api';
import type { AxiosError } from 'axios';
import { logoutAndClearAuth } from '../axios/auth/authEffects';
import { tokenService } from '../axios/auth/tokenService';

export const useRegisterUser = (navigate: NavigateFunction) => {
  return useMutation<{ user: UserProfile }, AxiosError<ApiErrorResponse>, RegisterFormData>({
    mutationKey: AUTH_QUERY_KEYS.register,
    mutationFn: register,
    onSuccess: () => {
      console.info(`[${AUTH_QUERY_KEYS.register}] user is registered successfully!`);
      navigate('/login');
    },
    onError: (error) => {
      console.error(
        `[${AUTH_QUERY_KEYS.register}] user failed to register : `,
        error.response?.data?.error?.message ?? error.message
      );
    },
  });
};

export const useLogin = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, AxiosError<ApiErrorResponse>, LoginFormState>({
    mutationKey: AUTH_QUERY_KEYS.login,
    mutationFn: login,
    onSuccess: (data) => {
      console.info(`[${AUTH_QUERY_KEYS.login}] user is logged in successfully!`);
      store.dispatch(loginSuccess(data.user));
      tokenService.set(data.accessToken);
      navigate('/');
    },
    onError: (error) => {
      console.error(
        `[${AUTH_QUERY_KEYS.login}] user failed to logged in : `,
        error.response?.data?.error?.message ?? error.message
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.userProfile });
    },
  });
};

export const useLogout = (navigate: NavigateFunction) =>
  useMutation<{ message: string }, AxiosError<ApiErrorResponse>>({
    mutationKey: AUTH_QUERY_KEYS.logout,
    mutationFn: logout,
    onSuccess: () => {
      console.info(`[${AUTH_QUERY_KEYS.logout}] Logged out successfully!`);
      logoutAndClearAuth();
      navigate('/login');
    },
    onError: (error) => {
      console.error(
        `[${AUTH_QUERY_KEYS.logout}] failed to logged out: `,
        error.response?.data?.error?.message ?? error.message
      );
    },
  });
