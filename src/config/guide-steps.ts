export type GuideStepType = {
  id: number;
  heading: string;
  description: string;
};

export const GUIDE_STEPS: GuideStepType[] = [
  {
    id: 1,
    heading: 'Set Your Goals',
    description:
      'Tell us about your fitness goals, experience level, available equipment, and schedule preferences.',
  },
  {
    id: 2,
    heading: 'Get Your Plan',
    description:
      'Receive a personalized workout plan tailored to your specific goals and circumstances.',
  },
  {
    id: 3,
    heading: 'Track & Progress',
    description:
      'Follow your workouts, track your progress, and watch as you move closer to your fitness goals.',
  },
];
