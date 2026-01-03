import type { CategoryType, CursorParams, CursorQuery } from '../../types/exercise';
import { EXERCISE_ICONS } from '../constants/exercise';

export type VariationParts = {
  title: string;
  description: string;
};

export const getExerciseIcon = (type: CategoryType) => EXERCISE_ICONS[type];

export const parseVariationDetail = (variation: string): VariationParts => {
  const [title, description] = variation.split(':');

  return {
    title: title?.trim() ?? '',
    description: description?.trim() ?? '',
  };
};

export const getCursor = (params: CursorParams): CursorQuery => {
  return params.direction === 'next' ? { after: params.cursor } : { before: params.cursor };
};
