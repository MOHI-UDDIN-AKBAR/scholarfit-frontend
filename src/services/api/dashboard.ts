import type { DashboardStats } from '../../types/dashboard';
import { axiosInstance } from '../axios/axiosInstance';

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await axiosInstance.get<DashboardStats>('/dashboard/stats');
  return data;
};
