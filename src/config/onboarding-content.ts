import type { IconName } from '../components/ui/Icon';

export type OnboardingStep =
  | 'goalsStep'
  | 'experienceStep'
  | 'equipmentStep'
  | 'scheduleStep'
  | 'personalDetailsStep';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type OnboardingIcon = { icon: IconName; iconStyle: string };

export type OnboardingHeaderContent = {
  [K in OnboardingStep]: {
    headerTitle: string;
    headerContent: string;
  };
};

export type OnboardingGoalCard = {
  goal: string;
  cardContent: {
    cardIcon: OnboardingIcon;
    cardTitle: string;
    cardDescription: string;
  };
};

export type OnboardingExperienceOption = {
  experienceLevel: ExperienceLevel;
  optionContent: {
    optionIcon: OnboardingIcon;
    optionTitle: string;
    optionSubtitle: string;
    optionDescription: string;
  };
};

export type OnboardingEquipmentCard = {
  equipment: string;
  equipmentTitle: string;
  equipmentIcon: OnboardingIcon;
};

export type NumericOption<T extends number = number> = {
  value: T;
  label: string;
};

export type WorkoutFrequencyOptionsGroup = {
  questionTitle: string;
  options: NumericOption[];
};

export type WorkoutDurationSelector = {
  questionTitle: string;
  options: NumericOption[];
};

export type SplitOptionType = {
  value: string;
  title: string;
  description: string;
};

export type WorkoutSplitSelector = {
  questionTitle: string;
  options: SplitOptionType[];
};

export type Gender = 'male' | 'female' | 'other';
export type HeightUnit = 'cm' | 'ft';
export type WeightUnit = 'kg' | 'lbs';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very' | 'extreme';

export type DailyActivity<T extends ActivityLevel = ActivityLevel> = {
  value: T;
  optionText: {
    title: string;
    description: string;
  };
};

export type UnitField<UnitType extends string> = {
  htmlFor: string;
  label: string;
  unitOption: UnitType[];
};

export const makeDailyLevel = <T extends ActivityLevel>(
  config: DailyActivity<T>
): DailyActivity<T> & { htmlFor: T } => {
  return {
    ...config,
    htmlFor: config.value,
  };
};

export type ActivityLevelDataType = ReturnType<typeof makeDailyLevel>;

export type OnboardingPersonalDetail = {
  age: { htmlFor: string; label: string };
  gender: { label: string; values: Gender[] };
  height: UnitField<HeightUnit>;
  weight: UnitField<WeightUnit>;
  targetWeight: UnitField<WeightUnit>;
  dailyActivityLevel: { label: string; activityLevels: ActivityLevelDataType[] };
};

export const onboardingHeaderContent: OnboardingHeaderContent = {
  goalsStep: {
    headerTitle: `Welcome to ScholarFit!`,
    headerContent: `Let's personalize your fitness journey. This will take about 3 minutes.`,
  },
  experienceStep: {
    headerTitle: `What's your experience level?`,
    headerContent: `This helps us recommend the right workouts for you`,
  },
  equipmentStep: {
    headerTitle: `What equipment do you have access to?`,
    headerContent: `Select all that you regularly use or have available`,
  },
  scheduleStep: {
    headerTitle: `What's your workout schedule?`,
    headerContent: `Tell us about your availability and preferences`,
  },
  personalDetailsStep: {
    headerTitle: `Almost there!`,
    headerContent: `Just a few more details to personalize your experience`,
  },
};

export const onboardingGoalCards: OnboardingGoalCard[] = [
  {
    goal: 'muscle_gain',
    cardContent: {
      cardIcon: { icon: 'dumbbell', iconStyle: 'text-blue-600 bg-blue-100' },
      cardTitle: 'Build Muscle',
      cardDescription: 'Increase muscle size and strength.',
    },
  },
  {
    goal: 'fat_loss',
    cardContent: {
      cardIcon: { icon: 'weight', iconStyle: 'text-green-600 bg-green-100' },
      cardTitle: 'Lose Weight',
      cardDescription: 'Reduce body fat and slim down.',
    },
  },
  {
    goal: 'strength',
    cardContent: {
      cardIcon: { icon: 'handFist', iconStyle: 'text-purple-600 bg-purple-100' },
      cardTitle: 'Increase Strength',
      cardDescription: 'Improve overall power and performance.',
    },
  },
  {
    goal: 'general_fitness',
    cardContent: {
      cardIcon: { icon: 'heartPulse', iconStyle: 'text-yellow-600 bg-yellow-100' },
      cardTitle: 'General Fitness',
      cardDescription: 'Stay active and maintain health.',
    },
  },
  {
    goal: 'endurance',
    cardContent: {
      cardIcon: { icon: 'personRunning', iconStyle: 'text-red-600 bg-red-100' },
      cardTitle: 'Improve Endurance',
      cardDescription: 'Build cardiovascular fitness.',
    },
  },
  {
    goal: 'sports_performance',
    cardContent: {
      cardIcon: { icon: 'trophy', iconStyle: 'text-indigo-600 bg-indigo-100' },
      cardTitle: 'Sports Performance',
      cardDescription: 'Enhance abilities for specific sports.',
    },
  },
];

export const onboardingExperienceOptions: OnboardingExperienceOption[] = [
  {
    experienceLevel: 'beginner',
    optionContent: {
      optionIcon: { icon: 'seedling', iconStyle: 'text-green-600 bg-green-100' },
      optionTitle: 'Beginner',
      optionSubtitle: 'New to structured training',
      optionDescription: `You're just starting your fitness journey or have limited experience with structured workouts. We'll focus on fundamentals and proper form.`,
    },
  },

  {
    experienceLevel: 'intermediate',
    optionContent: {
      optionIcon: { icon: 'leaf', iconStyle: 'text-blue-600 bg-blue-100' },
      optionTitle: 'Intermediate',
      optionSubtitle: 'Some consistent training experience',
      optionDescription: `You've been training consistently for 6+ months and understand basic exercise principles. Ready for more challenging workouts.`,
    },
  },
  {
    experienceLevel: 'advanced',
    optionContent: {
      optionIcon: { icon: 'fire', iconStyle: 'text-purple-600 bg-purple-100' },
      optionTitle: 'Advanced',
      optionSubtitle: 'Years of consistent training',
      optionDescription: `You have years of training experience, understand advanced techniques, and are looking to optimize performance.`,
    },
  },
];

export const onboardingEquipmentCards: OnboardingEquipmentCard[] = [
  {
    equipment: 'bodyweight',
    equipmentTitle: 'Bodyweight Only',
    equipmentIcon: { icon: 'user', iconStyle: 'text-gray-600 bg-gray-100' },
  },
  {
    equipment: 'dumbbells',
    equipmentTitle: 'Dumbbells',
    equipmentIcon: { icon: 'dumbbell', iconStyle: 'text-blue-600 bg-blue-100' },
  },
  {
    equipment: 'barbell',
    equipmentTitle: 'Barbell & Plates',
    equipmentIcon: { icon: 'weightHanging', iconStyle: 'text-green-600 bg-green-100' },
  },
  {
    equipment: 'resistance_bands',
    equipmentTitle: 'Resistance Bands',
    equipmentIcon: { icon: 'ring', iconStyle: 'text-purple-600 bg-purple-100' },
  },
  {
    equipment: 'kettlebells',
    equipmentTitle: 'Kettlebells',
    equipmentIcon: { icon: 'dumbbell', iconStyle: 'text-yellow-600 bg-yellow-100' },
  },
  {
    equipment: 'gym_access',
    equipmentTitle: 'Full Gym Access',
    equipmentIcon: { icon: 'building', iconStyle: 'text-red-600 bg-red-100' },
  },
  {
    equipment: 'pull_up_bar',
    equipmentTitle: 'Pull-up Bar',
    equipmentIcon: { icon: 'gripLines', iconStyle: 'text-indigo-600 bg-indigo-100' },
  },
  {
    equipment: 'bench',
    equipmentTitle: 'Workout Bench',
    equipmentIcon: { icon: 'couch', iconStyle: 'text-pink-600 bg-pink-100' },
  },
  {
    equipment: 'yoga_mat',
    equipmentTitle: 'Yoga Mat',
    equipmentIcon: { icon: 'layerGroup', iconStyle: 'text-teal-600 bg-teal-100' },
  },
];

export const workoutFrequencyOptionsGroup: WorkoutFrequencyOptionsGroup = {
  questionTitle: 'How many days per week can you workout?',
  options: [
    {
      value: 2,
      label: '2 days',
    },
    {
      value: 3,
      label: '3 days',
    },
    {
      value: 4,
      label: '4 days',
    },
    {
      value: 5,
      label: '5 days',
    },
    {
      value: 6,
      label: '6 days',
    },
  ],
};

export const workoutDurationSelector: WorkoutDurationSelector = {
  questionTitle: 'How long are your typical workout sessions?',
  options: [
    {
      value: 30,
      label: '30 min',
    },
    {
      value: 45,
      label: '45 min',
    },
    {
      value: 60,
      label: '60 min',
    },
    {
      value: 75,
      label: '75 min',
    },
    {
      value: 90,
      label: '90 min',
    },
  ],
};

export const workoutSplitSelector: WorkoutSplitSelector = {
  questionTitle: 'Do you have a preferred workout split?',
  options: [
    {
      value: 'full_body',
      title: 'Full Body',
      description: 'Work all major muscle groups in each session',
    },
    {
      value: 'upper_lower',
      title: 'Upper/Lower',
      description: 'Alternate between upper and lower body days',
    },
    {
      value: 'push_pull_legs',
      title: 'Push/Pull/Legs',
      description: 'Separate pushing, pulling, and leg exercises',
    },
    {
      value: 'bro_split',
      title: 'Body Part Split',
      description: 'Focus on one or two muscle groups per day',
    },
    {
      value: 'no_preference',
      title: 'No Preference',
      description: 'Let ScholarFit choose the best split for me',
    },
  ],
};

export const onboardingPersonalDetail: OnboardingPersonalDetail = {
  age: { htmlFor: 'age', label: 'Age' },
  gender: { label: 'Gender ', values: ['male', 'female', 'other'] },
  height: {
    htmlFor: 'height',
    label: 'Height',
    unitOption: ['cm', 'ft'],
  },
  weight: { htmlFor: 'weight', label: 'Current Weight', unitOption: ['kg', 'lbs'] },
  targetWeight: {
    htmlFor: 'targetWeight',
    label: 'Target Weight (optional)',
    unitOption: ['kg', 'lbs'],
  },
  dailyActivityLevel: {
    label: 'Daily Activity Level',
    activityLevels: [
      makeDailyLevel({
        value: 'sedentary',
        optionText: {
          title: 'Sedentary',
          description: 'Little to no exercise, desk job',
        },
      }),
      makeDailyLevel({
        value: 'light',
        optionText: {
          title: 'Lightly Active',
          description: 'Light exercise 1-3 days/week',
        },
      }),
      makeDailyLevel({
        value: 'moderate',
        optionText: {
          title: 'Moderately Active',
          description: 'Moderate exercise 3-5 days/week',
        },
      }),
      makeDailyLevel({
        value: 'very',
        optionText: {
          title: 'Very Active',
          description: 'Hard exercise 6-7 days/week',
        },
      }),
      makeDailyLevel({
        value: 'extreme',
        optionText: {
          title: 'Extremely Active',
          description: 'Very hard exercise, physical job, or training 2x/day',
        },
      }),
    ],
  },
};
