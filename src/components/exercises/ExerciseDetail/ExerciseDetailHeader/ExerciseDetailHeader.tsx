import clsx from 'clsx';
import { capitalize } from '../../../../utils/helpers/formatUtils';
import Icon from '../../../ui/Icon/Icon';
import Button from '../../../ui/Button/Button';
import type { CategoryType } from '../../../../types/exercise';
import { EXERCISE_ICONS } from '../../../../utils/constants/exercise';

type ExerciseDetailHeaderProps = {
  name: string;
  exerciseType: CategoryType;
  equipments: string[];
  bodyParts: string[];
  overview: string;
};

const ExerciseDetailHeader: React.FC<ExerciseDetailHeaderProps> = ({
  name,
  exerciseType,
  equipments,
  bodyParts,
  overview,
}) => {
  return (
    <section className="px-4 mb-3 xl:mb-10 sm:px-0">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-6 py-6 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                <span
                  className={clsx(
                    'ml-4 inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ',
                    EXERCISE_ICONS[exerciseType].iconStyle
                      ? EXERCISE_ICONS[exerciseType].iconStyle
                      : 'bg-green-100 text-green-800'
                  )}
                >
                  {exerciseType}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-4 md:gap-6">
                <div className="flex items-center">
                  <Icon
                    name={EXERCISE_ICONS[exerciseType].icon}
                    className={clsx(
                      'mr-2 w-6 h-7 p-1 rounded-md',
                      EXERCISE_ICONS[exerciseType].iconStyle
                    )}
                  ></Icon>
                  {equipments.map((equipment) => (
                    <div className="flex items-center text-sm md:text-base" key={equipment}>
                      <span className="text-gray-500 ">{capitalize(equipment)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500 md:text-base">
                  <div className="flex items-center">
                    <Icon name="clock" className="mr-1 text-green-800" />
                    <span>5-10 min to learn</span>
                  </div>
                </div>
                <div className="flex items-center text-yellow-400">
                  <Icon name="star" />
                  <Icon name="star" />
                  <Icon name="star" />
                  <Icon name="star" />
                  <Icon name="star" />
                  <span className="ml-1.5 text-sm md:text-base font-medium text-gray-900">4.7</span>
                  <span className="ml-1 text-sm text-gray-500 md:text-base">(892 reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {bodyParts.map((bodyPart) => (
                  <span
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full"
                    key={bodyPart}
                  >
                    Chest
                  </span>
                ))}
              </div>
            </div>

            <div className="flex mt-6 space-x-3 lg:mt-0">
              <Button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
              >
                <Icon name="heart" className="mr-2 fill-pink-600" />
                Favorite
              </Button>
              <Button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
              >
                <Icon name="plus" className="mr-2" />
                Add to Workout
              </Button>
            </div>
          </div>
          <p className="my-6 mt-8 text-lg text-gray-600 ">{overview}</p>
        </div>
      </div>
    </section>
  );
};

export default ExerciseDetailHeader;
