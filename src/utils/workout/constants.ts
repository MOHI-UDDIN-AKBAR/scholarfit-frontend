import { SCHEDULE_PERIOD_STYLES } from '../constants/appConstants';

export const WORKOUT_UTILS_CONSTANTS = {
  RELATIVE_DAY_LABELS: {
    0: 'Today',
    1: 'Tomorrow',
    2: 'Next day',
  } as Record<number, string>,

  DASHBOARD_STAT_ICONS: {
    totalWorkouts: { icon: 'dumbbell', iconColor: 'text-purple-600', bgColor: 'bg-purple-100' },
    currentStreak: { icon: 'fire', iconColor: 'text-red-600', bgColor: 'bg-red-100' },
    weeklyGoal: { icon: 'calendar', iconColor: 'text-green-600', bgColor: 'bg-green-100' },
    bodyWeight: { icon: 'weight', iconColor: 'text-blue-600', bgColor: 'bg-blue-100' },
  } as const,

  PROFILE_STAT_ICONS: {
    streak: { icon: 'fire', bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
    workouts: { icon: 'dumbbell', bgColor: 'bg-green-50', iconColor: 'text-green-600' },
    sessions: { icon: 'check', bgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
    peakVolume: { icon: 'bolt', bgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
    bodyWeight: { icon: 'weightHanging', bgColor: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  } as const,

  SCHEDULE_PERIOD_STYLES,
} as const;
