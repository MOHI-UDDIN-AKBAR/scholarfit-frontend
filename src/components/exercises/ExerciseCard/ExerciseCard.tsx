import clsx from 'clsx';
import Icon from '../../ui/Icon/Icon';
import { capitalize } from '../../../utils/helpers/formatUtils';
import { Link } from 'react-router';
import Button from '../../ui/Button/Button';
import type { CategoryType, Exercise } from '../../../types/exercise';
import { EXERCISE_ICONS } from '../../../utils/constants/exercise';

type ExerciseCardProps = {
  exercise: Exercise;
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const exerciseIcon = EXERCISE_ICONS[exercise.exerciseType as CategoryType];

  if (!exercise || !exerciseIcon) return null;

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="grid h-full gap-8 p-5">
        <div className="flex items-center">
          <div
            className={clsx(
              'shrink-0 rounded-md p-2',
              exerciseIcon.iconStyle && exerciseIcon.iconStyle
            )}
          >
            <Icon name={exerciseIcon.icon} className="w-8 h-8 "></Icon>
          </div>
          <div className="flex-1 ml-4">
            <h3 className="text-lg font-medium text-gray-900 xl:text-xl">{exercise.name}</h3>
            <div className="flex items-center mt-2">
              {exercise.bodyParts.length > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-blue-100 text-blue-800">
                  {exercise.bodyParts.join(' ')}
                </span>
              )}
              <span
                className={clsx(
                  'ml-2 inline-flex items-center px-2 py-0.5 rounded text-sm font-medium',
                  exerciseIcon.iconStyle && exerciseIcon.iconStyle
                )}
              >
                {capitalize(exercise.exerciseType)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="button"
            className="inline-flex items-center px-3 py-1 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm lg:text-base hover:bg-gray-50 focus:outline-none"
          >
            <Icon name="heart" className="mr-2 fill-pink-600" />
            Favorite
          </Button>
          <Link
            to={exercise.exerciseId}
            className="text-sm font-medium text-blue-600 lg:text-base hover:text-blue-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
