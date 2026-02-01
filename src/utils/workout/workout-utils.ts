import type { ExerciseConfiguration, Workout, WorkoutProgram } from '../../types/workout';

export const getTotalExerciseLength = (programs: WorkoutProgram[]): number => {
  return programs.reduce((totalLength, program) => {
    return (totalLength += program.exercises.length);
  }, 0);
};

export const isWorkoutAdded = (workouts: Workout[], workoutId: string): boolean => {
  return workouts.some((workout) => workout.id === workoutId);
};

export const getWorkoutExercises = (workoutPrograms: WorkoutProgram[]): ExerciseConfiguration[] => {
  return workoutPrograms.flatMap((program) => program.exercises);
};

export const getWorkout = (workoutList: Workout[], workoutId: string): Workout | undefined => {
  return workoutList.find((workout) => workout.id === workoutId);
};
