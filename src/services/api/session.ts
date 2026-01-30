import type { ApiResponse } from '../../types/api';
import type {
  SessionStats,
  StreakInfo,
  VolumeTrend,
  SessionWorkoutHistory,
  WorkoutHistoryEntry,
  WorkoutHistoryInput,
  CompletedSessionProgram,
} from '../../types/session';
import { api } from '../axios/axios';

export const getSessionHistory = async (): Promise<SessionWorkoutHistory> => {
  const { data } = await api.get<ApiResponse<SessionWorkoutHistory>>('/sessions');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getCompletedSessionPrograms = async (): Promise<CompletedSessionProgram[]> => {
  const { data } = await api.get<ApiResponse<CompletedSessionProgram[]>>(
    '/sessions/completed-session-programs'
  );

  console.log('Query result:', data);

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getSessionStats = async (): Promise<SessionStats> => {
  const { data } = await api.get<ApiResponse<SessionStats>>('/sessions/stats');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getUserStreak = async (): Promise<Omit<StreakInfo, 'lastUpdated'>> => {
  const { data } = await api.get<ApiResponse<Omit<StreakInfo, 'lastUpdated'>>>('/sessions/streak');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getRecentSessions = async (): Promise<WorkoutHistoryEntry[]> => {
  const { data } = await api.get<ApiResponse<WorkoutHistoryEntry[]>>('/sessions/recent');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getVolumeTrend = async (): Promise<VolumeTrend[]> => {
  const { data } = await api.get<ApiResponse<VolumeTrend[]>>('/sessions/volume-trend');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const createSession = async ({
  sessionPayload,
}: {
  sessionPayload: WorkoutHistoryInput;
}): Promise<WorkoutHistoryEntry> => {
  const { data } = await api.post<ApiResponse<WorkoutHistoryEntry>>('/sessions', sessionPayload);

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};
