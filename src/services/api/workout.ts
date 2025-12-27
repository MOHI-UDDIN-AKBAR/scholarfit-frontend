import type { Workout, WorkoutInput } from '../../types/workout';
import { axiosInstance } from '../axios/axiosInstance';

export const getWorkoutList = async (): Promise<Workout[]> => {
  const { data } = await axiosInstance.get<Workout[]>('/workouts');
  return data;
};

export const getWorkoutById = async (workoutId: string): Promise<Workout> => {
  const { data } = await axiosInstance.get<Workout>(`/workouts/${workoutId}`);
  return data;
};

export const createWorkout = async (input: WorkoutInput): Promise<Workout> => {
  const { data } = await axiosInstance.post<Workout>('/workouts/', input);
  return data;
};

export const deleteWorkout = async ({ workoutId }: { workoutId: string }): Promise<boolean> => {
  const { data } = await axiosInstance.delete<boolean>(`/workouts/${workoutId}`);
  return data;
};
