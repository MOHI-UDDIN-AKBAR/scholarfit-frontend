import type { RadarChartPoint } from '../../components/charts/RadarChart';
import type { LineChartPoint } from '../../types/dashboard';
import type { MeasurementKey, MeasurementSet } from '../../types/progress';
import { MEASUREMENT_KEYS, MEASUREMENT_LABELS } from '../constants/appConstants';
import { getShortMonthName } from '../helpers/dateUtils';
import type { BodyWeightHistory, BodyWeightTrend, VolumeTrend } from '../types';

export const mapBodyWeightTrendToChartData = (
  trends: readonly BodyWeightTrend[]
): LineChartPoint[] =>
  trends.map(({ value, month }) => ({
    label: month,
    value,
  }));

export const mapVolumeTrendToChartData = (trends: readonly VolumeTrend[]): LineChartPoint[] => {
  return trends.map(({ totalVolume, weekNumber }) => ({
    label: `Week ${weekNumber}`,
    value: totalVolume,
  }));
};

export const mapBodyWeightEntriesToChartData = (
  bodyWeight: BodyWeightHistory | undefined
): LineChartPoint[] | null => {
  if (!bodyWeight) return null;
  const { entries } = bodyWeight;
  return entries.map(({ value, createdAt }) => ({
    label: getShortMonthName(createdAt),
    value,
  }));
};

export const mapMeasurementsToChartPoints = (
  measurements: MeasurementSet,
  keys: Exclude<MeasurementKey, 'bodyFat'>[] = MEASUREMENT_KEYS
): RadarChartPoint[] => {
  return keys.map((key) => ({
    label: MEASUREMENT_LABELS[key],
    value: measurements[key].value,
  }));
};
