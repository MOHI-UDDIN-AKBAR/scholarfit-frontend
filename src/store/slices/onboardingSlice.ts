import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  ActivityLevel,
  ExperienceLevel,
  Gender,
  HeightUnit,
  WeightUnit,
} from '../../config/onboarding-content';
import { isObjectComplete } from '../../utils/helpers/validationUtils';

const ONBOARDING_STEP_START_AT = 1;
const ONBOARDING_STEP_END_AT = 5;
const ONBOARDING_STEPS = [
  'goals',
  'experience',
  'equipment',
  'schedule',
  'personal-details',
] as const;

export const ONBOARDING_FITNESS_GOALS = [
  'muscle_gain',
  'fat_loss',
  'strength',
  'general_fitness',
  'endurance',
  'sports_performance',
] as const;

export type OnboardingStepName = (typeof ONBOARDING_STEPS)[number];
export type OnboardingFitnessGoal = (typeof ONBOARDING_FITNESS_GOALS)[number];

type OnboardingState = {
  currentOnboardingStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isReadyToContinue: boolean;
  currentStepName: OnboardingStepName;
  onboardingData: {
    fitnessGoal: OnboardingFitnessGoal[] | undefined;
    experienceLevel: ExperienceLevel | undefined;
    equipments: string[] | undefined;
    schedule: {
      workoutFrequency: number | undefined;
      workoutDuration: number | undefined;
      preferredWorkoutSplit: string | undefined;
    };
    personalDetails: {
      age: number | undefined;
      gender: Gender | undefined;
      height: {
        value: number | undefined;
        unit: HeightUnit;
      };
      currentWeight: {
        value: number | undefined;
        unit: WeightUnit;
      };
      targetWeight: {
        value: number | undefined;
        unit: WeightUnit;
      };
      activityLevel: ActivityLevel | undefined;
    };
  };
};

const initialState: OnboardingState = {
  currentOnboardingStep: ONBOARDING_STEP_START_AT,
  isFirstStep: true,
  isLastStep: false,
  currentStepName: 'goals',
  isReadyToContinue: false,
  onboardingData: {
    fitnessGoal: undefined,
    experienceLevel: undefined,
    equipments: undefined,
    schedule: {
      workoutFrequency: undefined,
      workoutDuration: undefined,
      preferredWorkoutSplit: undefined,
    },
    personalDetails: {
      age: undefined,
      gender: undefined,
      height: {
        value: undefined,
        unit: 'cm',
      },
      currentWeight: {
        value: undefined,
        unit: 'kg',
      },
      targetWeight: {
        value: undefined,
        unit: 'kg',
      },
      activityLevel: undefined,
    },
  },
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    previousOnboardingStep: (state) => {
      if (state.currentOnboardingStep > ONBOARDING_STEP_START_AT) {
        state.currentOnboardingStep -= 1;
        state.isFirstStep = state.currentOnboardingStep === ONBOARDING_STEP_START_AT;
        state.isLastStep = false;
        state.currentStepName = ONBOARDING_STEPS[state.currentOnboardingStep - 1];
        state.isReadyToContinue = true;
      }
    },
    nextOnboardingStep: (state) => {
      if (state.currentOnboardingStep < ONBOARDING_STEP_END_AT) {
        state.currentOnboardingStep += 1;
        state.isLastStep = state.currentOnboardingStep === ONBOARDING_STEP_END_AT;
        state.isFirstStep = false;
        state.currentStepName = ONBOARDING_STEPS[state.currentOnboardingStep - 1];
        state.isReadyToContinue = false;
      }
    },
    selectFitnessGoal: (state, action: PayloadAction<OnboardingFitnessGoal>) => {
      if (state.onboardingData.fitnessGoal) {
        state.onboardingData.fitnessGoal = [...state.onboardingData.fitnessGoal, action.payload];
      } else {
        state.onboardingData.fitnessGoal = [action.payload];
      }
      state.isReadyToContinue = true;
    },
    selectExperienceLevel: (state, action: PayloadAction<ExperienceLevel>) => {
      state.onboardingData.experienceLevel = action.payload;
      state.isReadyToContinue = true;
    },
    selectEquipments: (state, action: PayloadAction<string>) => {
      if (state.onboardingData.equipments) {
        state.onboardingData.equipments = [...state.onboardingData.equipments, action.payload];
      } else {
        state.onboardingData.equipments = [action.payload];
      }
      state.isReadyToContinue = true;
    },
    selectWorkoutFrequency: (state, action: PayloadAction<number>) => {
      state.onboardingData.schedule.workoutFrequency = action.payload;
      if (isObjectComplete(state.onboardingData.schedule)) {
        state.isReadyToContinue = true;
      }
    },
    selectWorkoutDuration: (state, action: PayloadAction<number>) => {
      state.onboardingData.schedule.workoutDuration = action.payload;
      if (isObjectComplete(state.onboardingData.schedule)) {
        state.isReadyToContinue = true;
      }
    },
    selectPreferredWorkoutSplit: (state, action: PayloadAction<string>) => {
      state.onboardingData.schedule.preferredWorkoutSplit = action.payload;
      if (isObjectComplete(state.onboardingData.schedule)) {
        state.isReadyToContinue = true;
      }
    },
    addUserAge: (state, action: PayloadAction<number>) => {
      state.onboardingData.personalDetails.age = action.payload;
      if (isObjectComplete(state.onboardingData.personalDetails)) {
        state.isReadyToContinue = true;
      }
    },
    selectUserGender: (state, action: PayloadAction<Gender>) => {
      state.onboardingData.personalDetails.gender = action.payload;
      if (isObjectComplete(state.onboardingData.personalDetails)) {
        state.isReadyToContinue = true;
      }
    },
    addUserHeight: (state, action: PayloadAction<{ value: number; unit: HeightUnit }>) => {
      state.onboardingData.personalDetails.height = action.payload;
      if (isObjectComplete(state.onboardingData.personalDetails)) {
        state.isReadyToContinue = true;
      }
    },
    addUserCurrentWeight: (state, action: PayloadAction<{ value: number; unit: WeightUnit }>) => {
      state.onboardingData.personalDetails.currentWeight = action.payload;
      if (isObjectComplete(state.onboardingData.personalDetails)) {
        state.isReadyToContinue = true;
      }
    },
    addUserTargetWeight: (state, action: PayloadAction<{ value: number; unit: WeightUnit }>) => {
      state.onboardingData.personalDetails.targetWeight = action.payload;
      if (isObjectComplete(state.onboardingData.personalDetails)) {
        state.isReadyToContinue = true;
      }
    },
    selectUserActivityLevel: (state, action: PayloadAction<ActivityLevel>) => {
      state.onboardingData.personalDetails.activityLevel = action.payload;
      if (isObjectComplete(state.onboardingData.personalDetails)) {
        state.isReadyToContinue = true;
      }
    },
  },
});

export const onboardingReducer = onboardingSlice.reducer;
export const {
  previousOnboardingStep,
  nextOnboardingStep,
  selectFitnessGoal,
  selectExperienceLevel,
  selectEquipments,
  selectWorkoutFrequency,
  selectWorkoutDuration,
  selectPreferredWorkoutSplit,
  addUserAge,
  selectUserGender,
  addUserHeight,
  addUserCurrentWeight,
  addUserTargetWeight,
  selectUserActivityLevel,
} = onboardingSlice.actions;
