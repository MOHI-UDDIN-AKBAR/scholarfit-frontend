import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  CategoryType,
  ExerciseCategory,
  PaginationDirection,
  SingleExercise,
} from '../../types/exercise';
import { EXERCISE_CATEGORIES } from '../../utils/constants/appConstants';

export type PersonalStats = {
  personalRecord: {
    label: string;
    weight: number;
    reps: number;
    display: string;
    dateLabel: string;
    date: string;
  };

  lastPerformed: {
    label: string;
    timeAgo: string;
    workoutName: string;
  };

  performanceCount: {
    label: string;
    total: number;
    monthlyChange: string;
  };

  progressTrend: {
    label: string;
    percent: number;
    color: 'green' | 'red';
    barFill: number;
  };
};

export const personalStats: PersonalStats = {
  personalRecord: {
    label: 'Personal Record',
    weight: 100,
    reps: 5,
    display: '100 kg x 5',
    dateLabel: 'Set on Nov 15, 2025',
    date: '2025-11-15',
  },

  lastPerformed: {
    label: 'Last Performed',
    timeAgo: '3 days ago',
    workoutName: 'Upper Body A workout',
  },

  performanceCount: {
    label: 'Times Performed',
    total: 24,
    monthlyChange: '+3 this month',
  },

  progressTrend: {
    label: 'Progress Trend',
    percent: 12,
    color: 'green',
    barFill: 65,
  },
};

export const workoutOptions = [
  'Upper Body A',
  'Upper Body B',
  'Chest Focus',
  'Create New Workout',
] as const;

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
  exerciseCategories: EXERCISE_CATEGORIES,
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
