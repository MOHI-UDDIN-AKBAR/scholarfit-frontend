import store from '../store/store';
import { setExerciseName } from '../store/slices/exercisesSlice';

export const searchFormAction = async (_: unknown, formData: FormData): Promise<void> => {
  const exerciseName = (formData.get('search-exercise') as string).trim();
  if (exerciseName.length === 0) return;
  store.dispatch(setExerciseName(exerciseName));
};
