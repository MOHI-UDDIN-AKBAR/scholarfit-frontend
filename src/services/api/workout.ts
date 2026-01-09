import type { ApiResponse } from '../../types/api';
import type { Workout, WorkoutInput } from '../../types/workout';
import { api } from '../axios/axios';

export const getWorkoutList = async (): Promise<Workout[]> => {
  const { data } = await api.get<ApiResponse<Workout[]>>('/workouts');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getUserWorkoutList = async (): Promise<Workout[]> => {
  const { data } = await api.get<ApiResponse<Workout[]>>('/workouts/user-favorite');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getWorkoutById = async (workoutId: string): Promise<Workout> => {
  const { data } = await api.get<ApiResponse<Workout>>(`/workouts/${workoutId}`);

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const createWorkout = async (input: WorkoutInput): Promise<Workout> => {
  const { data } = await api.post<ApiResponse<Workout>>('/workouts/', input);

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const addWorkoutToUserList = async (workoutId: string): Promise<Workout> => {
  const { data } = await api.post<ApiResponse<Workout>>(`/workouts/favorite-workouts`, {
    workoutId,
  });

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const removeWorkout = async ({ workoutId }: { workoutId: string }): Promise<boolean> => {
  const { data } = await api.delete<ApiResponse<boolean>>(`/workouts/${workoutId}`);

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};
