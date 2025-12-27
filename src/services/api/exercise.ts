import type { CategoryType, Exercise, SingleExercise } from '../../types/exercise';
import { axiosInstance } from '../axios/axiosInstance';

export const getExercises = async (): Promise<Exercise[]> => {
  const { data } = await axiosInstance.get<Exercise[]>('/exercises');
  return data;
};

export const getExerciseCategories = async (): Promise<CategoryType[]> => {
  const { data } = await axiosInstance.get<CategoryType[]>('/exercises/categories');
  return data;
};

export const getExerciseById = async (exerciseId: string): Promise<SingleExercise> => {
  const { data } = await axiosInstance.get<SingleExercise>(`/exercises/${exerciseId}`);
  return data;
};
