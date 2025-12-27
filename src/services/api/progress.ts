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
import { axiosInstance } from '../axios/axiosInstance';

export const getBodyWeightHistory = async (): Promise<BodyWeightHistory> => {
  const { data } = await axiosInstance.get<BodyWeightHistory>('/progress/body-weight/history');
  return data;
};

export const getLatestBodyWeight = async (): Promise<BodyWeightEntry> => {
  const { data } = await axiosInstance.get<BodyWeightEntry>('/progress/body-weight/latest');
  return data;
};

export const createBodyWeightEntry = async (
  entry: CreateBodyWeightInput
): Promise<BodyWeightEntry> => {
  const { data } = await axiosInstance.post<BodyWeightEntry>('/progress/body-weight', entry);
  return data;
};

export const getBodyMeasurementHistory = async (): Promise<BodyMeasurementHistory> => {
  const { data } = await axiosInstance.get<BodyMeasurementHistory>(
    '/progress/body-measurements/history'
  );
  return data;
};

export const getLatestBodyMeasurements = async (): Promise<BodyMeasurementEntry> => {
  const { data } = await axiosInstance.get<BodyMeasurementEntry>(
    '/progress/body-measurements/latest'
  );
  return data;
};

export const createBodyMeasurementEntry = async (
  entry: CreateBodyMeasurementInput
): Promise<BodyMeasurementEntry> => {
  const { data } = await axiosInstance.post<BodyMeasurementEntry>(
    '/progress/body-measurements',
    entry
  );
  return data;
};

export const getUserProgress = async (): Promise<UserProgress> => {
  const { data } = await axiosInstance.get<UserProgress>('/progress');
  return data;
};

export const getProgressStats = async (): Promise<ProgressStats> => {
  const { data } = await axiosInstance.get<ProgressStats>('/progress/stats');
  return data;
};
