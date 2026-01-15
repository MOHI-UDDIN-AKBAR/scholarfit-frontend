import { authReducer } from './slices/authSlice';
import { exerciseReducer } from './slices/exercisesSlice';
import { onboardingReducer } from './slices/onboardingSlice';
import { progressReducer } from './slices/progressSlice';
import { toggleReducer } from './slices/toggleSlice';
import { workoutBuilderReducer } from './slices/workout-slices/workoutBuilderSlice';
import { workoutSessionReducer } from './slices/workout-slices/workoutSessionSlice';
import { workoutReducer } from './slices/workout-slices/workoutsSlice';

export const rootReducer = {
  toggle: toggleReducer,
  workouts: workoutReducer,
  onboarding: onboardingReducer,
  workoutBuilder: workoutBuilderReducer,
  workoutSession: workoutSessionReducer,
  exercises: exerciseReducer,
  progress: progressReducer,
  auth: authReducer,
};
