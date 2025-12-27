import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register, login, logout, refreshToken } from '../api/auth';
import { AUTH_KEYS } from '../queries/auth';

export const useRegister = () =>
  useMutation({
    mutationKey: AUTH_KEYS.register,
    mutationFn: register,
    onSuccess: (data) => {
      console.log(`${AUTH_KEYS.register} user ${data.id} is registered successfully!`);
    },
    onError: (error) => {
      console.error(`${AUTH_KEYS.register} user failed to register : `, error.message);
    },
  });

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AUTH_KEYS.login,
    mutationFn: login,
    onSuccess: ({ user }) => {
      console.log(`${AUTH_KEYS.login} user ${user.id} is logged in successfully!`);
    },
    onError: (error) => {
      console.error(`${AUTH_KEYS.login} user failed to logged in : `, error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.userProfile });
    },
  });
};

export const useLogout = () =>
  useMutation({
    mutationKey: AUTH_KEYS.logout,
    mutationFn: logout,
    onSuccess: () => {
      console.log(`${AUTH_KEYS.logout} Logged out successfully!`);
    },
    onError: (error) => {
      console.error(`${AUTH_KEYS.logout} failed to logged out: `, error.message);
    },
  });

export const useRefreshToken = () =>
  useMutation({
    mutationKey: AUTH_KEYS.refresh,
    mutationFn: refreshToken,
    onSuccess: () => {
      console.log(`${AUTH_KEYS.refresh} token refreshed successfully!`);
    },
    onError: (error) => {
      console.error(`${AUTH_KEYS.refresh} failed to refresh token : `, error.message);
    },
  });
