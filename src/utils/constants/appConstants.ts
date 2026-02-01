import type { IconName } from '../../components/ui/Icon';
import type { SchedulePeriod } from '../../types/dashboard';
import type { ExerciseCategory } from '../../types/exercise';
import type { MeasurementKey } from '../../types/progress';
import type { MeasurementType } from '../../types/user-profile';

export const screenBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ONE_WEEK_MS = 1000 * 60 * 60 * 24 * 7;

export const WEEKDAY_LABELS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export const SCHEDULE_PERIOD_STYLES: Record<
  SchedulePeriod,
  {
    statusBgClass: string;
    statusTextClass: string;
    bgClass: string;
    borderClass: string;
  }
> = {
  today: {
    statusBgClass: 'bg-blue-100',
    statusTextClass: 'text-blue-800',
    bgClass: 'bg-white',
    borderClass: 'border-primary-200',
  },
  tomorrow: {
    statusBgClass: 'bg-indigo-100',
    statusTextClass: 'text-indigo-800',
    bgClass: 'bg-white',
    borderClass: 'border-primary-200',
  },
  upcoming: {
    statusBgClass: 'bg-gray-100',
    statusTextClass: 'text-gray-700',
    bgClass: 'bg-white',
    borderClass: 'border-gray-200',
  },
  completed: {
    statusBgClass: 'bg-green-100',
    statusTextClass: 'text-green-800',
    bgClass: 'bg-green-50',
    borderClass: 'border-green-200',
  },
  rest_day: {
    statusBgClass: 'bg-yellow-100',
    statusTextClass: 'text-yellow-800',
    bgClass: 'bg-yellow-50',
    borderClass: 'border-yellow-200',
  },
  missed: {
    statusBgClass: 'bg-red-100',
    statusTextClass: 'text-red-800',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
  },
};

export const CALENDAR_DAY_STYLES: Record<string, string> = {
  today: 'bg-blue-100 text-blue-800 border-2 border-blue-500 font-medium rounded-full',
  completed: 'bg-green-100 text-green-800 rounded-full font-medium',
  rest_day: 'bg-gray-100 text-gray-500 rounded-full',
  missed: 'bg-red-100 text-red-700 rounded-full font-medium',
  upcoming: 'text-gray-900',
  tomorrow: 'text-gray-900',
  default: 'text-gray-900',
  outside: 'text-gray-400',
};

export const MEASUREMENT_UI_CONFIG: Record<
  keyof MeasurementType,
  {
    label: string;
    unit: string;
    bgGradient: string;
    borderColor: string;
    textColor: string;
  }
> = {
  chest: {
    label: 'Chest',
    unit: 'cm',
    bgGradient: 'from-blue-50 to-white',
    borderColor: 'border-blue-100',
    textColor: 'text-blue-600',
  },
  waist: {
    label: 'Waist',
    unit: 'cm',
    bgGradient: 'from-green-50 to-white',
    borderColor: 'border-green-100',
    textColor: 'text-green-600',
  },
  arms: {
    label: 'Arms',
    unit: 'cm',
    bgGradient: 'from-orange-50 to-white',
    borderColor: 'border-orange-100',
    textColor: 'text-orange-600',
  },
  hips: {
    label: 'Hips',
    unit: 'cm',
    bgGradient: 'from-pink-50 to-white',
    borderColor: 'border-pink-100',
    textColor: 'text-pink-600',
  },
  thighs: {
    label: 'Thighs',
    unit: 'cm',
    bgGradient: 'from-yellow-50 to-white',
    borderColor: 'border-yellow-100',
    textColor: 'text-yellow-600',
  },
  bodyFat: {
    label: 'Body Fat',
    unit: '%',
    bgGradient: 'from-purple-50 to-white',
    borderColor: 'border-purple-100',
    textColor: 'text-purple-600',
  },
};

export const KEY_METRIC_CONFIG = {
  weight: {
    title: 'Current Weight',
    icon: 'weight',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
  bodyFat: {
    title: 'Body Fat',
    icon: 'percent',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
  },
} as const;

export const MONTHS_SHORT = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
] as const;

export const MEASUREMENT_LABELS: Record<Exclude<MeasurementKey, 'bodyFat'>, string> = {
  chest: 'Chest',
  waist: 'Waist',
  arms: 'Arms',
  hips: 'Hips',
  thighs: 'Thighs',
};

export const MEASUREMENT_KEYS: Exclude<MeasurementKey, 'bodyFat'>[] = [
  'chest',
  'waist',
  'arms',
  'hips',
  'thighs',
];

export const DAY = 24 * 60 * 60 * 1000;

type WorkoutCategory = {
  id: number;
  name: 'STRENGTH' | 'CARDIO' | 'PLYOMETRICS' | 'STRETCHING' | 'WEIGHTLIFTING' | 'YOGA' | 'AEROBIC';
  icon: IconName;
  iconColor: string;
  totalPrograms: number;
};

export const WORKOUT_CATEGORIES: WorkoutCategory[] = [
  {
    id: 1,
    name: 'STRENGTH',
    iconColor: 'blue',
    icon: 'dumbbell',
    totalPrograms: 10,
  },
  {
    id: 2,
    name: 'CARDIO',
    iconColor: 'green',
    icon: 'personRunning',
    totalPrograms: 23,
  },
  {
    id: 3,
    name: 'PLYOMETRICS',
    iconColor: 'yellow',
    icon: 'bolt',
    totalPrograms: 23,
  },
  {
    id: 4,
    name: 'STRETCHING',
    iconColor: 'purple',
    icon: 'childReaching',
    totalPrograms: 13,
  },
  {
    id: 5,
    name: 'WEIGHTLIFTING',
    iconColor: 'red',
    icon: 'weightHanging',
    totalPrograms: 8,
  },
  {
    id: 6,
    name: 'YOGA',
    iconColor: 'emerald',
    icon: 'seedling',
    totalPrograms: 0,
  },
  {
    id: 7,
    name: 'AEROBIC',
    iconColor: 'pink',
    icon: 'heartPulse',
    totalPrograms: 2,
  },
];

type PrimaryEquipment = {
  name: string;
};

export const PRIMARY_EQUIPMENTS: PrimaryEquipment[] = [
  {
    name: 'ASSISTED',
  },
  {
    name: 'BAND',
  },
  {
    name: 'BARBELL',
  },
  {
    name: 'BATTLING ROPE',
  },
  {
    name: 'BODY WEIGHT',
  },
  {
    name: 'BOSU BALL',
  },
  {
    name: 'CABLE',
  },
  {
    name: 'DUMBBELL',
  },
  {
    name: 'EZ BARBELL',
  },
  {
    name: 'HAMMER',
  },
  {
    name: 'KETTLEBELL',
  },
  {
    name: 'LEVERAGE MACHINE',
  },
  {
    name: 'MEDICINE BALL',
  },
  {
    name: 'OLYMPIC BARBELL',
  },
  {
    name: 'POWER SLED',
  },
  {
    name: 'RESISTANCE BAND',
  },
  {
    name: 'ROLL',
  },
  {
    name: 'ROLLBALL',
  },
  {
    name: 'ROPE',
  },
  {
    name: 'SLED MACHINE',
  },
  {
    name: 'SMITH MACHINE',
  },
  {
    name: 'STABILITY BALL',
  },
  {
    name: 'STICK',
  },
  {
    name: 'SUSPENSION',
  },
  {
    name: 'TRAP BAR',
  },
  {
    name: 'VIBRATE PLATE',
  },
  {
    name: 'WEIGHTED',
  },
  {
    name: 'WHEEL ROLLER',
  },
];

export const DIFFICULTIES = [
  { label: 'Beginner', value: 'beginner', textColor: 'text-green-800', bgColor: 'bg-green-100' },
  {
    label: 'Intermediate',
    value: 'intermediate',
    textColor: 'text-yellow-800',
    bgColor: 'bg-yellow-100',
  },
  { label: 'Advanced', value: 'advanced', textColor: 'text-red-800', bgColor: 'bg-red-100' },
];

export const EXERCISE_CATEGORIES: ExerciseCategory[] = [
  { name: 'STRENGTH' },
  { name: 'CARDIO' },
  { name: 'PLYOMETRICS' },
  { name: 'STRETCHING' },
  { name: 'WEIGHTLIFTING' },
  { name: 'YOGA' },
  { name: 'AEROBIC' },
];
