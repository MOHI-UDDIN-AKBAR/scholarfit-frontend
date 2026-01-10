import type { IconName } from '../components/ui/Icon';
import type { Onboarding, WeightUnit } from './onboarding';
import type { SessionStats } from './session';

export type IdWithTimestamp = {
  id: string;
  createdAt: string;
};

export type Direction = 'increase' | 'decrease' | 'no_change';
export type LengthUnit = 'cm' | 'inches';
export type PercentageUnit = '%';

export interface User extends IdWithTimestamp {
  email: string;
  password: string;
  name: string;
  role: 'user';
  isEmailVerified: boolean;
  isOnboarded: boolean;
  isActive: boolean;
  googleId?: string;
  avatarUrl?: string;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  emailVerifiedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLoginAt?: Date;
  updatedAt: string;
}

export type BodyWeightStats = {
  current: number | undefined;
  starting: number;
  change: number;
  unit: WeightUnit;
  changeDirection: Direction;
};

export type MeasurementType = {
  chest: LengthUnit;
  waist: LengthUnit;
  arms: LengthUnit;
  hips: LengthUnit;
  thighs: LengthUnit;
  bodyFat: PercentageUnit;
};

export type MeasurementStats = {
  [K in keyof MeasurementType]: {
    starting: number;
    current: number;
    change: number;
    changeDirection: Direction;
  };
};

export interface ProfileData {
  user: User | undefined;
  personalInfo: Onboarding | undefined;
  bodyWeightStats: BodyWeightStats | undefined;
  measurementStats: MeasurementStats | undefined;
  sessionStats: SessionStats;
}

export type ProfileStatCard = {
  id: 'streak' | 'workouts' | 'sessions' | 'peakVolume' | 'bodyWeight';
  label: string;
  value: number | string;
  icon: IconName;
  bgColor: string;
  iconColor: string;
};

export type BodyMeasurementCard = {
  id: string;
  label: string;
  value: number;
  unit: string;
  change: string;
  changeColor: string;
  icon: IconName | string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  changeDirection: Direction;
};
