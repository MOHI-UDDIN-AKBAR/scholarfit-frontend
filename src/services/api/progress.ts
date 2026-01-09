import type { ApiResponse } from '../../types/api';
import type {
  BodyMeasurementEntry,
  BodyMeasurementHistory,
  BodyWeightEntry,
  BodyWeightHistory,
  CreateBodyMeasurementInput,
  CreateBodyWeightInput,
  ProgressStats,
  UserProgress,
} from '../../types/progress';
import { api } from '../axios/axios';

export const getBodyWeightHistory = async (): Promise<BodyWeightHistory> => {
  const { data } = await api.get<ApiResponse<BodyWeightHistory>>('/progress/body-weight/history');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getLatestBodyWeight = async (): Promise<BodyWeightEntry> => {
  const { data } = await api.get<ApiResponse<BodyWeightEntry>>('/progress/body-weight/latest');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const createBodyWeightEntry = async (
  entry: CreateBodyWeightInput
): Promise<BodyWeightEntry> => {
  const { data } = await api.post<ApiResponse<BodyWeightEntry>>('/progress/body-weight', entry);

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getBodyMeasurementHistory = async (): Promise<BodyMeasurementHistory> => {
  const { data } = await api.get<ApiResponse<BodyMeasurementHistory>>(
    '/progress/body-measurements/history'
  );

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getLatestBodyMeasurements = async (): Promise<BodyMeasurementEntry> => {
  const { data } = await api.get<ApiResponse<BodyMeasurementEntry>>(
    '/progress/body-measurements/latest'
  );

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const createBodyMeasurementEntry = async (
  entry: CreateBodyMeasurementInput
): Promise<BodyMeasurementEntry> => {
  const { data } = await api.post<ApiResponse<BodyMeasurementEntry>>(
    '/progress/body-measurements',
    entry
  );

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getUserProgress = async (): Promise<UserProgress> => {
  const { data } = await api.get<ApiResponse<UserProgress>>('/progress');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getProgressStats = async (): Promise<ProgressStats> => {
  const { data } = await api.get<ApiResponse<ProgressStats>>('/progress/stats');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};
