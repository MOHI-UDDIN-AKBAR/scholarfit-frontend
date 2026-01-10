import { USER_PROFILE_QUERY_KEYS } from '../../utils/constants/queryKeys/user-profile';
import { getProfileData } from '../api/user-profile';
import { useQuery } from '@tanstack/react-query';

export const useGetProfileData = () =>
  useQuery({
    queryKey: USER_PROFILE_QUERY_KEYS.profileData,
    queryFn: getProfileData,
  });
