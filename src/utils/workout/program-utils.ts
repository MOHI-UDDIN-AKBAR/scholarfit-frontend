import type { WorkoutProgramWithExercises } from '../../store/slices/workout-slices/workoutBuilderSlice';
import type { WorkoutProgram } from '../../types/workout';
import { getWeekdayNumber } from '../helpers/dateUtils';

export const doesProgramExistForDay = (
  programs: WorkoutProgramWithExercises[],
  dayNumber: number
): boolean => {
  return programs.some((program) => program.dayNumber === dayNumber);
};

export const isAnyProgramScheduledForToday = (workoutPrograms: WorkoutProgram[]): boolean => {
  const today = getWeekdayNumber();
  return workoutPrograms.some((program) => program.dayNumber === today);
};

export const getProgramScheduledForToday = (
  workoutPrograms: WorkoutProgram[]
): WorkoutProgram | undefined => {
  const today = getWeekdayNumber();
  return workoutPrograms.find((program) => program.dayNumber === today);
};
