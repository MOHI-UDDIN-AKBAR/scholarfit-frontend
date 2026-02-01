import type { IconName } from '../../../components/ui/Icon';
import type { CategoryType } from '../../../types/exercise';

export type ExerciseIconConfig = {
  icon: IconName;
  iconStyle: string;
};

export const EXERCISE_ICONS: Record<CategoryType, ExerciseIconConfig> = {
  STRENGTH: {
    iconStyle: 'text-blue-600 bg-blue-100',
    icon: 'dumbbell',
  },
  CARDIO: {
    iconStyle: 'text-green-600 bg-green-100',
    icon: 'personRunning',
  },
  PLYOMETRICS: {
    iconStyle: 'text-yellow-600 bg-yellow-100',
    icon: 'bolt',
  },
  STRETCHING: {
    iconStyle: 'text-purple-600 bg-purple-100',
    icon: 'childReaching',
  },
  WEIGHTLIFTING: {
    iconStyle: 'text-red-600 bg-red-100',
    icon: 'weightHanging',
  },
  YOGA: {
    iconStyle: 'text-emerald-600 bg-emerald-100',
    icon: 'seedling',
  },
  AEROBIC: {
    iconStyle: 'text-pink-600 bg-pink-100',
    icon: 'heartPulse',
  },
};
