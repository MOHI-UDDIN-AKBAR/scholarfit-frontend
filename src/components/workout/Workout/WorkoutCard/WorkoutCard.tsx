import clsx from 'clsx';
import Icon from '../../../ui/Icon/Icon';
import Button from '../../../ui/Button/Button';
import { Link, Navigate } from 'react-router';
import { useAppState } from '../../../../store/hooks';
import type { Workout } from '../../../../types/workout';
import { useAddWorkout } from '../../../../services/mutations/workout';
import { useCallback, useEffect, useState } from 'react';
import { LoadingSpinner } from '../../../shared/LoadingSpinner/LoadingSpinner';
import { useGetUserWorkoutList } from '../../../../services/queries/workout';
import { isWorkoutAdded } from '../../../../utils/workout/workout-utils';

type WorkoutCardProps = {
  workout: Workout;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
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
    <section className="overflow-hidden bg-white rounded-lg shadow">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <Link to={`${workout.id}`} className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-md shrink-0">
              <Icon name="dumbbell" className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 capitalize">{workout.name}</h3>
              <div className="flex items-center mt-1">
                <span
                  className={clsx(
                    'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize',
                    workout.difficulty.toLowerCase() === 'beginner'
                      ? 'bg-green-100 text-green-800'
                      : workout.difficulty.toLowerCase() === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : workout.difficulty.toLowerCase() === 'advanced'
                          ? 'bg-red-100 text-red-800'
                          : ''
                  )}
                >
                  {workout.difficulty}
                </span>
                <span className="ml-2 text-xs text-gray-500">{workout.frequency} days/week</span>
              </div>
            </div>
          </Link>
          {workout.rating && (
            <div className="text-right">
              <div className="flex items-center text-yellow-400">
                <Icon name="star" className="w-6 h-6 -mt-1" />
                <span className="ml-1 text-sm font-medium text-gray-900">{workout.rating}</span>
              </div>
            </div>
          )}
        </div>
        <p className="mt-3 text-base text-gray-500">{workout.description}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <Icon name="clock" className="mr-1" />
            <span className="capitalize">{workout.duration} min/day</span>
            <Icon name="dumbbell" className="ml-3 mr-1 -mt-1" />
            <span className="capitalize">{workout.programs.length} programs</span>
          </div>
          <div className="flex space-x-2">
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Button
                type="button"
                className={clsx(
                  'inline-flex items-center px-3 py-1 text-sm font-medium leading-4 text-white border border-transparent rounded-md  focus:outline-none',
                  isFavoriteWorkout ? 'bg-green-600' : 'bg-primary-600 hover:bg-primary-700'
                )}
                onClick={() => addWorkoutMutation(workout.id)}
              >
                {isFavoriteWorkout ? 'Enrolled' : 'Enroll'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutCard;
