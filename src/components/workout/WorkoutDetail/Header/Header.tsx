import clsx from 'clsx';
import Button from '../../../ui/Button/Button';
import Icon from '../../../ui/Icon/Icon';
import { useAppState } from '../../../../store/hooks';
import type { Workout } from '../../../../types/workout';
import { useAddWorkout } from '../../../../services/mutations/workout';
import { Navigate } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { LoadingSpinner } from '../../../shared/LoadingSpinner/LoadingSpinner';
import { useGetUserWorkoutList } from '../../../../services/queries/workout';
import { getTotalExerciseLength, isWorkoutAdded } from '../../../../utils/workout/workout-utils';

type HeaderProp = {
  workout: Workout;
};

const Header: React.FC<HeaderProp> = ({ workout }) => {
  const [isFavoriteWorkout, setIsFavoriteWorkout] = useState<boolean>(false);

  const userId = useAppState((state) => state.auth.userInfo?.id);

  const { data: userWorkoutList, isLoading } = userId
    ? useGetUserWorkoutList(userId)
    : { data: undefined, isLoading: false };

  const { mutate: addWorkoutMutation } = useAddWorkout(userId ?? '');

  const checkFavoriteStatus = useCallback(() => {
    if (!userWorkoutList) return;
    const isAdded = isWorkoutAdded(userWorkoutList, workout.id);
    setIsFavoriteWorkout(isAdded);
  }, [workout.id, userWorkoutList]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  if (!userId) return <Navigate to="/" replace />;

  return (
    <header className="px-4 sm:px-0">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-6 py-6 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-900">{workout.name}</h1>
                <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {workout.difficulty}
                </span>
              </div>
              <ul className="flex flex-wrap items-center gap-4 mt-4">
                <li className="flex items-center text-sm text-gray-500">
                  <Icon name="clock" className="mr-1"></Icon>
                  <span>{workout.duration} weeks • 60-75 min/session</span>
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <Icon name="dumbbell" className="mr-1.5 -mt-1"></Icon>
                  <span>{getTotalExerciseLength(workout.programs)} exercises</span>
                </li>
                <li className="flex items-center text-sm text-gray-500">
                  <Icon name="fire" className="mr-1 -mt-1"></Icon>
                  <span>{workout.frequency} days/week</span>
                </li>
                {workout.rating && (
                  <li className="flex items-center text-yellow-400">
                    <Icon name="star" className="-mt-1"></Icon>
                    <span className="ml-1 text-sm font-medium text-gray-900">{workout.rating}</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="flex mt-6 space-x-3 lg:mt-0">
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Button
                  type="button"
                  className={clsx(
                    'inline-flex items-center px-4 py-2 text-sm font-medium  bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none',
                    isFavoriteWorkout ? 'text-pink-700' : 'text-gray-700'
                  )}
                  disabled={isFavoriteWorkout}
                  onClick={() => addWorkoutMutation(workout.id)}
                >
                  <Icon name="heart" className="mr-2"></Icon>
                  {isFavoriteWorkout ? 'Saved' : 'Save'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
