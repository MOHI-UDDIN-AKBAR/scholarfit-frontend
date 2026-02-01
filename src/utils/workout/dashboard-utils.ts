import type { WeeklyProgram, WeeklyProgramCard } from '../../types/dashboard';
import { getWeekdayNameByDayNumber } from '../helpers/dateUtils';
import type { BuildDashboardStatsParams, DashboardStat } from '../types';
import { WORKOUT_UTILS_CONSTANTS } from './constants';
export const buildDashboardStats = ({
  streakInfo,
  weeklyGoal,
  bodyWeightStats,
  totalPrograms,
}: BuildDashboardStatsParams): DashboardStat[] => {
  const stats: DashboardStat[] = [
    {
      id: 'totalWorkouts',
      title: 'Total Workouts',
      value: totalPrograms,
      ...WORKOUT_UTILS_CONSTANTS.DASHBOARD_STAT_ICONS.totalWorkouts,
    },
    {
      id: 'currentStreak',
      title: 'Current Streak',
      value: `${streakInfo.currentStreak} days`,
      ...WORKOUT_UTILS_CONSTANTS.DASHBOARD_STAT_ICONS.currentStreak,
      extra: `Longest streak: ${streakInfo.longestStreak} days`,
    },
    {
      id: 'weeklyGoal',
      title: 'Weekly Goal',
      value: `${weeklyGoal.numberOfExercisesCompleted}/${weeklyGoal.numberOfExercises} workouts`,
      ...WORKOUT_UTILS_CONSTANTS.DASHBOARD_STAT_ICONS.weeklyGoal,
      progress: weeklyGoal.completionPercentage,
    },
  ];

  if (bodyWeightStats) {
    const direction =
      bodyWeightStats.change > 0 ? 'up' : bodyWeightStats.change < 0 ? 'down' : 'no change';

    stats.push({
      id: 'bodyWeight',
      title: 'Body Weight',
      value: `${bodyWeightStats.current} kg`,
      ...WORKOUT_UTILS_CONSTANTS.DASHBOARD_STAT_ICONS.bodyWeight,
      extra: `${bodyWeightStats.change} kg ${direction}`,
    });
  }

  return stats;
};

export const mapWeeklyProgramsToCards = (weeklyPrograms: WeeklyProgram[]): WeeklyProgramCard[] =>
  weeklyPrograms.map((program) => {
    const styles = WORKOUT_UTILS_CONSTANTS.SCHEDULE_PERIOD_STYLES[program.schedulePeriod];

    return {
      dayLabel: getWeekdayNameByDayNumber(program.dayNumber),
      name: program.name,
      durationLabel: `${program.duration} min`,
      status: program.schedulePeriod,
      ...styles,
    };
  });
