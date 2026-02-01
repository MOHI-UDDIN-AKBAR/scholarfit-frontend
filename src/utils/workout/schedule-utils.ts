import type { Workout } from '../../types/workout';
import { getWeekdayNumber } from '../helpers/dateUtils';
import type { UpcomingProgram } from '../types';
import { WORKOUT_UTILS_CONSTANTS } from './constants';

export const getNextUpcomingProgram = (
  workouts: Workout[],
  today: number = getWeekdayNumber()
): UpcomingProgram | null => {
  const allPrograms: UpcomingProgram[] = workouts.flatMap((workout) =>
    workout.programs.map((program) => ({
      workoutId: workout.id,
      workoutName: workout.name,
      program,
    }))
  );

  if (allPrograms.length === 0) return null;

  const sortedPrograms = allPrograms.sort((a, b) => a.program.dayNumber - b.program.dayNumber);

  const nextProgram = sortedPrograms.find((item) => item.program.dayNumber > today);

  return nextProgram ?? sortedPrograms[0];
};

export const getRelativeDayLabel = (
  targetDayNumber: number,
  today: number = getWeekdayNumber()
): string => {
  const diff = targetDayNumber >= today ? targetDayNumber - today : 7 - today + targetDayNumber;

  return WORKOUT_UTILS_CONSTANTS.RELATIVE_DAY_LABELS[diff] ?? `In ${diff} days`;
};
