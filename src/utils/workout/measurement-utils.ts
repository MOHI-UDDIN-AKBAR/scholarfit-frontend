import type {
  BodyWeightHistory,
  MeasurementKey,
  MeasurementSet,
  RecentWeightEntry,
} from '../../types/progress';
import { formatRelativeDate } from '../helpers/dateUtils';
import type { BodyMeasurementHistory } from '../types';

export const getStartMeasurements = (
  bodyMeasurements: BodyMeasurementHistory | undefined
): MeasurementSet | null => {
  if (!bodyMeasurements || bodyMeasurements.entries.length === 0) return null;
  const { entries } = bodyMeasurements;
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return sortedEntries[0].measurements;
};

export const getLatestMeasurements = (
  bodyMeasurements: BodyMeasurementHistory | undefined
): MeasurementSet | null => {
  if (!bodyMeasurements || bodyMeasurements.entries.length === 0) return null;
  const { entries } = bodyMeasurements;

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return sortedEntries[0].measurements;
};

export const calculateMeasurementChange = (
  current: MeasurementSet,
  start: MeasurementSet,
  key: MeasurementKey
): number => {
  const currentValue = current[key].value;
  const startValue = start[key].value;
  return currentValue - startValue;
};

export const formatMeasurementChange = (change: number): string => {
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(1)} cm`;
};

export const mapRecentWeightEntries = (
  bodyWeight: BodyWeightHistory | undefined
): RecentWeightEntry[] | null => {
  if (!bodyWeight) return null;
  const { entries } = bodyWeight;

  return entries.map((entry) => ({
    date: formatRelativeDate(entry.createdAt),
    weight: entry.value,
    notes: entry.notes,
  }));
};
