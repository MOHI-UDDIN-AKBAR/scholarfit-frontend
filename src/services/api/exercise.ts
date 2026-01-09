import type { ApiMeta, ApiResponse } from '../../types/api';
import type { CategoryType, CursorQuery, Exercise, SingleExercise } from '../../types/exercise';
import { api } from '../axios/axios';

export const getExercises = async (
  name?: string,
  exerciseType?: CategoryType,
  cursor?: CursorQuery,
  limit: number = 10
): Promise<{ data: Exercise[]; metaData?: ApiMeta }> => {
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

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return { data: data.data, metaData: data.meta };
};

export const getExerciseCategories = async (): Promise<CategoryType[]> => {
  const { data } = await api.get<ApiResponse<CategoryType[]>>('/exercises/categories');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getExerciseById = async (exerciseId: string): Promise<SingleExercise> => {
  const { data } = await api.get<ApiResponse<SingleExercise>>(`/exercises/${exerciseId}`);

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};
