import type {
  SessionStats,
  StreakInfo,
  VolumeTrend,
  SessionWorkoutHistory,
  WorkoutHistoryEntry,
  WorkoutHistoryInput,
} from '../../types/session';
import { axiosInstance } from '../axios/axiosInstance';

export const getSessionHistory = async (): Promise<SessionWorkoutHistory> => {
  const { data } = await axiosInstance.get<SessionWorkoutHistory>('/sessions');
  return data;
};

export const getSessionStats = async (): Promise<SessionStats> => {
  const { data } = await axiosInstance.get<SessionStats>('/sessions/stats');
  return data;
};

export const getUserStreak = async (): Promise<Omit<StreakInfo, 'lastUpdated'>> => {
  const { data } = await axiosInstance.get<Omit<StreakInfo, 'lastUpdated'>>('/sessions/streak');
  return data;
};

export const getRecentSessions = async (): Promise<WorkoutHistoryEntry[]> => {
  const { data } = await axiosInstance.get<WorkoutHistoryEntry[]>('/sessions/recent');
  return data;
};

export const getVolumeTrend = async (): Promise<VolumeTrend[]> => {
  const { data } = await axiosInstance.get<VolumeTrend[]>('/sessions/volume-trend');
  return data;
};

export const createSession = async ({
  sessionPayload,
}: {
  sessionPayload: WorkoutHistoryInput;
}): Promise<WorkoutHistoryEntry> => {
  const { data } = await axiosInstance.post<WorkoutHistoryEntry>('/sessions', sessionPayload);
  return data;
};
