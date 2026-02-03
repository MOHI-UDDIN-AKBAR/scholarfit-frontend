export type OnboardingFitnessGoal =
  | 'muscle_gain'
  | 'fat_loss'
  | 'strength'
  | 'general_fitness'
  | 'endurance'
  | 'sports_performance';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type Gender = 'male' | 'female' | 'other';
export type HeightUnit = 'cm' | 'ft';
export type WeightUnit = 'kg' | 'lbs';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very' | 'extreme';

export type Onboarding = {
  userId?: string;
  fitnessGoal: OnboardingFitnessGoal[];
  experienceLevel: ExperienceLevel;
  equipments: string[];
  schedule: {
    workoutFrequency: number;
    workoutDuration: number;
    preferredWorkoutSplit: string;
  };
  personalDetails: {
    age: number;
    gender: Gender;
    height: {
      value: number;
      unit: HeightUnit;
    };
    currentWeight: {
      value: number;
      unit: WeightUnit;
    };
    targetWeight: {
      value: number;
      unit: WeightUnit;
    };
    activityLevel: ActivityLevel;
  };
  createdAt: string;
};

export interface OnboardingInput extends Omit<Onboarding, 'createdAt'> {}
