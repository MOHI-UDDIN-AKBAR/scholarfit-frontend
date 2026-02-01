import type { RadarChartPoint } from '../../components/charts/RadarChart';
import type { BodyWeightTrend, LineChartPoint } from '../../types/dashboard';
import type {
  BodyMeasurementHistory,
  BodyWeightHistory,
  MeasurementKey,
  MeasurementSet,
  RecentWeightEntry,
} from '../../types/progress';
import type { VolumeTrend } from '../../types/session';
import type { WorkoutProgram } from '../../types/workout';

export type ValidationResult = {
  isValid: boolean;
  error: string | null;
};

export type UpcomingProgram = {
  workoutId: string;
  workoutName: string;
  program: WorkoutProgram;
};

export type ChartDataUtils = {
  mapBodyWeightTrendToChartData: (trends: readonly BodyWeightTrend[]) => LineChartPoint[];
  mapVolumeTrendToChartData: (trends: readonly VolumeTrend[]) => LineChartPoint[];
  mapBodyWeightEntriesToChartData: (
    bodyWeight: BodyWeightHistory | undefined
  ) => LineChartPoint[] | null;
  mapMeasurementsToChartPoints: (
    measurements: MeasurementSet,
    keys?: Exclude<MeasurementKey, 'bodyFat'>[]
  ) => RadarChartPoint[];
};

export type MeasurementUtils = {
  getStartMeasurements: (
    bodyMeasurements: BodyMeasurementHistory | undefined
  ) => MeasurementSet | null;
  getLatestMeasurements: (
    bodyMeasurements: BodyMeasurementHistory | undefined
  ) => MeasurementSet | null;
  calculateMeasurementChange: (
    current: MeasurementSet,
    start: MeasurementSet,
    key: MeasurementKey
  ) => number;
  formatMeasurementChange: (change: number) => string;
  mapRecentWeightEntries: (bodyWeight: BodyWeightHistory | undefined) => RecentWeightEntry[] | null;
};

export type {
  BodyWeightTrend,
  BuildDashboardStatsParams,
  DashboardStat,
} from '../../types/dashboard';
export type { SessionStats, VolumeTrend } from '../../types/session';
export type { BodyMeasurementCard, ProfileStatCard } from '../../types/user-profile';
export type {
  BodyMeasurementHistory,
  BodyWeightHistory,
  KeyMetricCard,
  RecentWeightEntry,
  WeightTrend,
} from '../../types/progress';
