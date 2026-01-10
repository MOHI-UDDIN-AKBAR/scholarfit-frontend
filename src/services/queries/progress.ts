import { useQuery } from '@tanstack/react-query';
import {
  getBodyWeightHistory,
  getLatestBodyWeight,
  getBodyMeasurementHistory,
  getLatestBodyMeasurements,
  getProgressStats,
  getUserProgress,
} from '../api/progress';
import { PROGRESS_QUERY_KEYS } from '../../utils/constants/queryKeys/progress';

export const useGetBodyWeightHistory = () =>
  useQuery({
    queryKey: PROGRESS_QUERY_KEYS.bodyWeightHistory,
    queryFn: getBodyWeightHistory,
  });

export const useGetLatestBodyWeight = () =>
  useQuery({
    queryKey: PROGRESS_QUERY_KEYS.latestBodyWeight,
    queryFn: getLatestBodyWeight,
  });

export const useGetBodyMeasurementHistory = () =>
  useQuery({
    queryKey: PROGRESS_QUERY_KEYS.bodyMeasurementHistory,
    queryFn: getBodyMeasurementHistory,
  });

export const useGetLatestBodyMeasurements = () =>
  useQuery({
    queryKey: PROGRESS_QUERY_KEYS.latestBodyMeasurement,
    queryFn: getLatestBodyMeasurements,
  });

export const useGetUserProgress = () =>
  useQuery({
    queryKey: PROGRESS_QUERY_KEYS.userProgress,
    queryFn: getUserProgress,
  });

export const useGetProgressStats = () =>
  useQuery({
    queryKey: PROGRESS_QUERY_KEYS.progressStats,
    queryFn: getProgressStats,
  });
