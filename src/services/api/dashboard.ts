import type { DashboardStats } from '../../types/dashboard';
import { api } from '../axios/axios';
import type { ApiResponse } from '../../types/api';

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};
