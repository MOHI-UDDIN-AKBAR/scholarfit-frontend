import { useQuery } from '@tanstack/react-query';
import {
  getSessionHistory,
  getSessionStats,
  getRecentSessions,
  getUserStreak,
  getVolumeTrend,
} from '../api/session';

export const SESSION_KEYS = {
  sessionHistory: ['session-history'] as const,
  sessionStats: ['session-stats'] as const,
  recentSession: ['recent-session'] as const,
  userStreak: ['user-streak'] as const,
  volumeTrend: ['volume-trend'] as const,
  createSession: ['create-session'] as const,
};

export const useGetSessionHistory = () =>
  useQuery({
    queryKey: SESSION_KEYS.sessionHistory,
    queryFn: getSessionHistory,
  });

export const useGetSessionStats = () =>
  useQuery({
    queryKey: SESSION_KEYS.sessionStats,
    queryFn: getSessionStats,
  });

export const useGetRecentSession = () =>
  useQuery({
    queryKey: SESSION_KEYS.recentSession,
    queryFn: getRecentSessions,
  });

export const useGetUserStreak = () =>
  useQuery({
    queryKey: SESSION_KEYS.userStreak,
    queryFn: getUserStreak,
  });

export const useGetVolumeTrend = () =>
  useQuery({
    queryKey: SESSION_KEYS.volumeTrend,
    queryFn: getVolumeTrend,
  });
