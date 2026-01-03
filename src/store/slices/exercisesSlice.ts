import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  CategoryType,
  ExerciseCategory,
  PaginationDirection,
  SingleExercise,
} from '../../types/exercise';

export const exerciseCategories: ExerciseCategory[] = [
  { name: 'STRENGTH' },
  { name: 'CARDIO' },
  { name: 'PLYOMETRICS' },
  { name: 'STRETCHING' },
  { name: 'WEIGHTLIFTING' },
  { name: 'YOGA' },
  { name: 'AEROBIC' },
];

export type ExerciseState = {
  exerciseName: string | undefined;
  selectedCategory: CategoryType;
  exerciseCategories: ExerciseCategory[];
  queryCursor: string | undefined;
  individualExercise: SingleExercise | undefined;
  paginationDirection: PaginationDirection;
};

const initialState: ExerciseState = {
  exerciseName: undefined,
  selectedCategory: 'STRENGTH',
  paginationDirection: 'next',
  exerciseCategories,
  queryCursor: undefined,
  individualExercise: undefined,
};

const exerciseSlice = createSlice({
  name: 'exerciseSlice',
  initialState,
  reducers: {
    setExerciseName: (state, action: PayloadAction<string>) => {
      state.queryCursor = undefined;
      state.exerciseName = action.payload;
      state.selectedCategory = 'STRENGTH';
    },
    setExerciseCategory: (state, action: PayloadAction<ExerciseCategory['name']>) => {
      state.queryCursor = undefined;
      state.exerciseName = undefined;
      state.selectedCategory = action.payload;
    },
    updateExercisesQuery: (
      state,
      action: PayloadAction<{
        paginationDirection: PaginationDirection;
        cursor: string;
      }>
    ) => {
      state.paginationDirection = action.payload.paginationDirection;
      if (action.payload.cursor) {
        state.queryCursor = action.payload.cursor;
      }
    },
  },
});

export const { setExerciseName, setExerciseCategory, updateExercisesQuery } = exerciseSlice.actions;
export const exerciseReducer = exerciseSlice.reducer;
