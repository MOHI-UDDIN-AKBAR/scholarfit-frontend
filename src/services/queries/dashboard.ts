import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../api/dashboard';
import { DASHBOARD_QUERY_KEYS } from '../../utils/constants/queryKeys/dashboard';

export const useGetDashboardStats = () =>
  useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.dashboardStats,
    queryFn: getDashboardStats,
  });
