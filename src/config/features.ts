import type { IconName } from '../components/ui/Icon';

export type FeatureType = {
  label: IconName;
  title: string;
  text: string;
  color: string;
};

export const FEATURES: FeatureType[] = [
  {
    label: 'dumbbell',
    title: 'Exercise Library',
    text: `Access hundreds of exercises with detailed instructions, form tips, and video demonstrations to ensure you're performing movements correctly.`,
    color: 'bg-primary-500',
  },
  {
    label: 'chart',
    title: 'Progress Tracking',
    text: `Monitor your strength gains, body measurements, and workout consistency with detailed analytics and visual progress charts.`,
    color: 'bg-fitness-green',
  },
  {
    label: 'calendar',
    title: 'Workout Plans',
    text: `Follow science-backed workout programs or create your own custom routines tailored to your goals, schedule, and available equipment.`,
    color: 'bg-fitness-purple',
  },
  {
    label: 'trophy',
    title: 'Achievements',
    text: `Stay motivated with a gamified system of achievements, badges, and streaks that reward consistency and milestone accomplishments.`,
    color: 'bg-fitness-orange',
  },
  {
    label: 'calculator',
    title: 'Volume Tracking',
    text: `Automatically calculate and track your training volume by muscle group to ensure optimal training stimulus and prevent overtraining.`,
    color: 'bg-fitness-red',
  },
  {
    label: 'mobile',
    title: 'Mobile Friendly',
    text: `Access your workouts and track your progress on any device with our responsive design that works perfectly on phones, tablets, and computers.`,
    color: 'bg-primary-600',
  },
];
