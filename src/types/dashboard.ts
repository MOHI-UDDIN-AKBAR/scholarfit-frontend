import type { WeightUnit } from './onboarding';
import type { VolumeTrend } from './session';
import type { WorkoutProgram } from './workout';

export type CalendarDay = {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  program?: WeeklyProgram;
  status: SchedulePeriod | 'default' | 'outside';
};

export type WeeklyGoal = {
  numberOfExercises: number;
  numberOfExercisesCompleted: number;
  completionPercentage: number;
};

export type BodyWeightStats = {
  current: number;
  starting: number;
  change: number;
  unit: WeightUnit;
  changeDirection: 'increase' | 'decrease' | 'no_change';
};

export type SchedulePeriod =
  | 'today'
  | 'tomorrow'
  | 'upcoming'
  | 'completed'
  | 'rest_day'
  | 'missed';

export type WeeklyProgram = {
  id: string;
  name: string;
  dayNumber: number;
  restDays: number;
  duration: number;
  schedulePeriod: SchedulePeriod;
  isCompleted: boolean;
  workoutName?: string;
};

export type WeeklyProgramCard = {
  dayLabel: string;
  name: string;
  durationLabel: string;
  status: SchedulePeriod;
  statusBgClass: string;
  statusTextClass: string;
  bgClass: string;
  borderClass: string;
};

export interface ScheduledProgram extends WorkoutProgram {
  schedulePeriod: SchedulePeriod;
}

export type BodyWeightTrend = {
  id: string;
  value: number;
  unit: 'kg' | 'lbs';
  month: string;
  createdAt: string;
};

export type DashboardIcon = 'dumbbell' | 'fire' | 'calendar' | 'weight';

export interface DashboardStat {
  id: string;
  title: string;
  value: string | number;
  icon: DashboardIcon;
  iconColor: string;
  bgColor: string;
  extra?: string;
  progress?: number;
}

export interface BodyWeightChartPoint {
  value: number;
  month: string;
}

export interface VolumeTrendChartPoint {
  totalVolume: number;
  label: string;
  averageDailyVolume: number;
}

export type BuildDashboardStatsParams = {
  streakInfo: {
    currentStreak: number;
    longestStreak: number;
  };
  weeklyGoal: WeeklyGoal;
  bodyWeightStats?: BodyWeightStats | null;
  totalPrograms: number;
};

export interface DashboardStats {
  streakInfo: { currentStreak: number; longestStreak: number };
  weeklyGoal: WeeklyGoal;
  bodyWeightStats: BodyWeightStats | null;
  totalPrograms: number;
  weeklyPrograms: WeeklyProgram[];
  scheduledProgram: ScheduledProgram | null;
  volumeTrend: VolumeTrend[];
  bodyWeightTrend: BodyWeightTrend[] | undefined;
}

export interface LineChartPoint {
  label: string;
  value: number;
}
