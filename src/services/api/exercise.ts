import type {
  ApiResponse,
  CategoryType,
  CursorQuery,
  Exercise,
  SingleExercise,
} from '../../types/exercise';
import { api } from '../axios/axios';

export const getExercises = async (
  name?: string,
  exerciseType?: CategoryType,
  cursor?: CursorQuery,
  limit: number = 10
): Promise<ApiResponse<Exercise[]>> => {
  const params = new URLSearchParams();
  params.append('limit', limit.toString());

  if (cursor && 'after' in cursor) {
    params.append('after', cursor.after);
  } else if (cursor && 'before' in cursor) {
    params.append('before', cursor.before);
  } else if (name) {
    params.append('name', name);
  } else if (exerciseType) {
    params.append('exerciseType', exerciseType);
  }

  const url = `/exercises?${params.toString()}`;

  const { data } = await api.get<ApiResponse<Exercise[]>>(url);
  return data;
};

export const getExerciseCategories = async (): Promise<ApiResponse<CategoryType[]>> => {
  const { data } = await api.get<ApiResponse<CategoryType[]>>('/exercises/categories');
  return data;
};

export const getExerciseById = async (exerciseId: string): Promise<ApiResponse<SingleExercise>> => {
  const { data } = await api.get<ApiResponse<SingleExercise>>(`/exercises/${exerciseId}`);
  return data;
};
