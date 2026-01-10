import { AUTH_QUERY_KEYS } from '../../utils/constants/queryKeys/auth';
import { getUserProfile } from '../api/auth';
import { useQuery } from '@tanstack/react-query';

export const useGetUserProfile = () =>
  useQuery({
    queryKey: AUTH_QUERY_KEYS.userProfile,
    queryFn: getUserProfile,
  });
