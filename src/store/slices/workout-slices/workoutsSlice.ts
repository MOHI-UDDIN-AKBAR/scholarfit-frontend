import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type WorkoutTab = 'Workout Library' | 'My Workouts' | 'Completed';

type WorkoutState = {
  workoutTabs: WorkoutTab[];
  currentTab: WorkoutTab;
};

const initialState: WorkoutState = {
  workoutTabs: ['Workout Library', 'My Workouts', 'Completed'],
  currentTab: 'Workout Library',
};

const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    selectTab: (state, action: PayloadAction<WorkoutTab>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { selectTab } = workoutSlice.actions;

export const workoutReducer = workoutSlice.reducer;
