import clsx from 'clsx';
import Icon from '../../../ui/Icon/Icon';
import type { IconName } from '../../../ui/Icon';

type WorkoutCategory = {
  id: number;
  name: 'STRENGTH' | 'CARDIO' | 'PLYOMETRICS' | 'STRETCHING' | 'WEIGHTLIFTING' | 'YOGA' | 'AEROBIC';
  icon: IconName;
  iconColor: string;
  totalPrograms: number;
};

export const workoutCategories: WorkoutCategory[] = [
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

const CategoriesSection: React.FC = () => {
  return (
    <div className="px-4 mt-12 sm:px-0">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Workout Categories</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {workoutCategories.map((workoutCategory) => (
          <a
            key={workoutCategory.id}
            href="#"
            className={clsx(
              'border category-card',
              workoutCategory.iconColor &&
                `border-${workoutCategory.iconColor}-200 bg-${workoutCategory.iconColor}-50`
            )}
          >
            <div
              className={clsx(
                'category-icon',
                workoutCategory.iconColor &&
                  `text-${workoutCategory.iconColor}-600 bg-${workoutCategory.iconColor}-100`
              )}
            >
              <Icon name={workoutCategory.icon} />
            </div>
            <div className="category-text">
              <span className="category-title">{workoutCategory.name}</span>
              <span className="category-count">{workoutCategory.totalPrograms} programs</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
