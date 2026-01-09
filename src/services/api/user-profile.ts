import type { ApiResponse } from '../../types/api';
import type { ProfileData } from '../../types/user-profile';
import { api } from '../axios/axios';

export const getProfileData = async (): Promise<ProfileData> => {
  const { data } = await api.get<ApiResponse<ProfileData>>('/user-profile');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};
