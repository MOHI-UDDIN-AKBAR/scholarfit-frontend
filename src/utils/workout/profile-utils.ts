import type { DashboardStats } from '../../types/dashboard';
import type { BodyMeasurementCard, MeasurementStats } from '../../types/user-profile';
import { MEASUREMENT_UI_CONFIG } from '../constants/appConstants';
import {
  formatSignedChange,
  getChangeColorByDirection,
  getChangeIconByDirection,
} from '../helpers/formatUtils';
import type { ProfileStatCard, SessionStats } from '../types';
import { WORKOUT_UTILS_CONSTANTS } from './constants';

export const mapProfileHeaderStats = (
  sessionStats: SessionStats,
  dashboardStats?: DashboardStats
): ProfileStatCard[] => {
  const cards: ProfileStatCard[] = [];

  cards.push({
    id: 'streak',
    value: sessionStats.currentStreak,
    label: 'Day Streak',
    ...WORKOUT_UTILS_CONSTANTS.PROFILE_STAT_ICONS.streak,
  });

  cards.push({
    id: 'workouts',
    value: dashboardStats?.totalPrograms ?? 0,
    label: 'Workouts',
    ...WORKOUT_UTILS_CONSTANTS.PROFILE_STAT_ICONS.workouts,
  });

  cards.push({
    id: 'sessions',
    value: sessionStats.totalSessions,
    label: 'Sessions',
    ...WORKOUT_UTILS_CONSTANTS.PROFILE_STAT_ICONS.sessions,
  });

  cards.push({
    id: 'peakVolume',
    value: sessionStats.peakVolume,
    label: 'Peak Volume',
    ...WORKOUT_UTILS_CONSTANTS.PROFILE_STAT_ICONS.peakVolume,
  });

  if (dashboardStats?.bodyWeightStats) {
    cards.push({
      id: 'bodyWeight',
      value: `${dashboardStats.bodyWeightStats.current} kg`,
      label: 'Current Weight',
      ...WORKOUT_UTILS_CONSTANTS.PROFILE_STAT_ICONS.bodyWeight,
    });
  }

  return cards;
};

export const mapBodyMeasurementStats = (
  measurementStats: MeasurementStats
): BodyMeasurementCard[] => {
  return (Object.keys(measurementStats) as (keyof MeasurementStats)[]).map((key) => {
    const stat = measurementStats[key];
    const ui = MEASUREMENT_UI_CONFIG[key];

    return {
      id: key,
      label: ui.label,
      value: stat.current,
      unit: ui.unit,
      change: formatSignedChange(stat.change, ui.unit),
      changeColor: getChangeColorByDirection(stat.changeDirection),
      icon: getChangeIconByDirection(stat.changeDirection),
      bgGradient: ui.bgGradient,
      borderColor: ui.borderColor,
      textColor: ui.textColor,
      changeDirection: stat.changeDirection,
    };
  });
};
