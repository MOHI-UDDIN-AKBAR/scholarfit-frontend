import type { IconName } from '../components/ui/Icon';
import type { WeightUnit } from './onboarding';
import type { LengthUnit, PercentageUnit } from './user-profile';

export type CreateBodyWeightInput = {
  userId: string;
  value: number;
  unit: WeightUnit;
  notes?: string;
};

export interface BodyWeightEntry extends Omit<CreateBodyWeightInput, 'userId'> {
  id: string;
  createdAt: string;
}

export interface BodyWeightHistory {
  userId: string;
  entries: BodyWeightEntry[];
  lastUpdated: string;
}

export type WeightTrend = {
  current: number;
  previous: number;
  change: number;
  unit: WeightUnit;
};

export type MeasurementType = {
  chest: LengthUnit;
  waist: LengthUnit;
  arms: LengthUnit;
  hips: LengthUnit;
  thighs: LengthUnit;
  bodyFat: PercentageUnit;
};

export type MeasurementKey = keyof MeasurementType;

export type MeasurementEntry<K extends MeasurementKey> = {
  value: number;
  unit: MeasurementType[K];
};

export type MeasurementSet = {
  [K in keyof MeasurementType]: MeasurementEntry<K>;
};

export type CreateBodyMeasurementInput = {
  userId: string;
  measurements: MeasurementSet;
  notes?: string;
  date: string;
  time: string;
};

export interface BodyMeasurementEntry extends Omit<CreateBodyMeasurementInput, 'userId'> {
  id: string;
  createdAt: string;
}

export interface BodyMeasurementHistory {
  userId: string;
  entries: BodyMeasurementEntry[];
  lastUpdated: string;
}

export type UserProgress = {
  bodyWeight: BodyWeightHistory;
  bodyMeasurements: BodyMeasurementHistory;
};

export interface ProgressStats {
  totalEntries: {
    bodyWeight: number;
    bodyMeasurements: number;
  };
  latestMeasurements?: MeasurementSet;
  weightTrend?: {
    current: number;
    previous: number;
    change: number;
    unit: WeightUnit;
  };
}

export type KeyMetricCard = {
  id: string;
  title: 'Current Weight' | 'Body Fat';
  value: string;
  icon: IconName;
  iconColor: string;
  iconBg: string;
  change?: number;
  changeText?: string;
  changeColor?: string;
};

export type RecentWeightEntry = {
  date: string;
  weight: number;
  notes?: string;
};
