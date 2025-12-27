import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../api/dashboard';

const DASHBOARD_KEYS = {
  dashboardStats: ['dashboard-stats'] as const,
};
export const useGetDashboardStats = () =>
  useQuery({
    queryKey: DASHBOARD_KEYS.dashboardStats,
    queryFn: getDashboardStats,
  });
