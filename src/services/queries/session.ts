import { useQuery } from '@tanstack/react-query';
import {
  getSessionHistory,
  getSessionStats,
  getRecentSessions,
  getUserStreak,
  getVolumeTrend,
} from '../api/session';
import { SESSION_QUERY_KEYS } from '../../utils/constants/queryKeys/session';

export const useGetSessionHistory = () =>
  useQuery({
    queryKey: SESSION_QUERY_KEYS.sessionHistory,
    queryFn: getSessionHistory,
  });

export const useGetSessionStats = () =>
  useQuery({
    queryKey: SESSION_QUERY_KEYS.sessionStats,
    queryFn: getSessionStats,
  });

export const useGetRecentSession = () =>
  useQuery({
    queryKey: SESSION_QUERY_KEYS.recentSession,
    queryFn: getRecentSessions,
  });

export const useGetUserStreak = () =>
  useQuery({
    queryKey: SESSION_QUERY_KEYS.userStreak,
    queryFn: getUserStreak,
  });

export const useGetVolumeTrend = () =>
  useQuery({
    queryKey: SESSION_QUERY_KEYS.volumeTrend,
    queryFn: getVolumeTrend,
  });
