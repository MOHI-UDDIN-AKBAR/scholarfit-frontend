import { useQuery } from '@tanstack/react-query';
import {
  getBodyWeightHistory,
  getLatestBodyWeight,
  getBodyMeasurementHistory,
  getLatestBodyMeasurements,
  getProgressStats,
  getUserProgress,
} from '../api/progress';

export const PROGRESS_KEYS = {
  bodyWeightHistory: ['body-weight-history'] as const,
  latestBodyWeight: ['latest-body-weight'] as const,
  bodyMeasurementHistory: ['body-measurement-history'] as const,
  latestBodyMeasurement: ['latest-body-measurement'] as const,
  createBodyWeightEntry: ['create-body-weight-entry'] as const,
  createBodyMeasurementEntry: ['create-body-measurement-entry'] as const,
  userProgress: ['user-progress'] as const,
  progressStats: ['progress-stats'] as const,
};

export const useGetBodyWeightHistory = () =>
  useQuery({
    queryKey: PROGRESS_KEYS.bodyWeightHistory,
    queryFn: getBodyWeightHistory,
  });

export const useGetLatestBodyWeight = () =>
  useQuery({
    queryKey: PROGRESS_KEYS.latestBodyWeight,
    queryFn: getLatestBodyWeight,
  });

export const useGetBodyMeasurementHistory = () =>
  useQuery({
    queryKey: PROGRESS_KEYS.bodyMeasurementHistory,
    queryFn: getBodyMeasurementHistory,
  });

export const useGetLatestBodyMeasurements = () =>
  useQuery({
    queryKey: PROGRESS_KEYS.latestBodyMeasurement,
    queryFn: getLatestBodyMeasurements,
  });

export const useGetUserProgress = () =>
  useQuery({
    queryKey: PROGRESS_KEYS.userProgress,
    queryFn: getUserProgress,
  });

export const useGetProgressStats = () =>
  useQuery({
    queryKey: PROGRESS_KEYS.progressStats,
    queryFn: getProgressStats,
  });
