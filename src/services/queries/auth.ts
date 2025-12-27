import { getUserProfile } from '../api/auth';
import { useQuery } from '@tanstack/react-query';

export const AUTH_KEYS = {
  userProfile: ['user-profile'] as const,
  register: ['register'] as const,
  login: ['login'] as const,
  logout: ['logout'] as const,
  refresh: ['refresh'] as const,
};

export const useGetUserProfile = () =>
  useQuery({
    queryKey: AUTH_KEYS.userProfile,
    queryFn: getUserProfile,
  });
