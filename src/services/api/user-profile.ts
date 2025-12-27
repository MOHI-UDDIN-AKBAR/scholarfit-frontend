import type { ProfileData } from '../../types/user-profile';
import { axiosInstance } from '../axios/axiosInstance';

export const getProfileData = async (): Promise<ProfileData> => {
  const { data } = await axiosInstance.get<ProfileData>('/user-profile');
  return data;
};
