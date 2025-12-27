import { getProfileData } from '../api/user-profile';
import { useQuery } from '@tanstack/react-query';

const PROFILE_KEYS = {
  profileData: ['profile-data'] as const,
};

export const useGetProfileData = () =>
  useQuery({
    queryKey: PROFILE_KEYS.profileData,
    queryFn: getProfileData,
  });
