import { Link, Navigate } from 'react-router';
import Button from '../../../../ui/Button/Button';
import Icon from '../../../../ui/Icon/Icon';
import { useAppDispatch, useAppState } from '../../../../../store/hooks';
import { selectTab } from '../../../../../store/slices/workout-slices/workoutsSlice';
import { useGetUserWorkoutList } from '../../../../../services/queries/workout';
import { LoadingSpinner } from '../../../../shared/LoadingSpinner/LoadingSpinner';
import { useRemoveWorkout } from '../../../../../services/mutations/workout';
import EmptyState from '../../../../shared/EmptyState/EmptyState';
import { getTotalExerciseLength } from '../../../../../utils/workout/workout-utils';
import { useGetProfileData } from '../../../../../services/queries/user-profile';

const WorkoutList: React.FC<{ userId: string }> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { mutate: removeWorkoutMutation } = useRemoveWorkout(userId);

  const { data: userWorkouts, isLoading, isError, error } = useGetUserWorkoutList(userId);

  if (isLoading) {
    return (
      <section className="px-4 mt-8 sm:px-0 h-60">
        <div className="grid h-full">
          <LoadingSpinner size="xl" variant="primary" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <div className="grid h-full place-items-center">
          {error?.message || 'Failed to load workouts'}
        </div>
      </section>
    );
  }

  if (!userWorkouts || userWorkouts.length === 0) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <EmptyState
          title="No workouts yet"
          description="You haven not created or added any workouts yet. Start by creating or adding your first workout."
          wrapperClassName="max-w-md space-y-3"
          action={
            <div className="grid grid-cols-2 gap-4 pt-2">
              <Button
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
                onClick={() => dispatch(selectTab('Workout Library'))}
              >
                <Icon name="arrowLeft" className="mr-2" />
                Go to Workout List
              </Button>
              <Link
                to="/workouts/create-workout"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
              >
                <Icon name="plus" className="mr-2" />
                Create Workout
              </Link>
            </div>
          }
        />
      </section>
    );
  }

  return (
    <section id="my-workouts" className="tab-content">
      <div className="px-4 sm:px-0">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">My Custom Workouts</h3>
            <p className="mt-1 text-sm text-gray-500 xl:text-base">
              Workouts you've created or saved
            </p>
          </div>
          <ul className="divide-y divide-gray-200">
            {userWorkouts.map((workout) => (
              <li className="px-4 py-4 sm:px-6" key={workout.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-md shrink-0">
                      <Icon name="dumbbell" className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 xl:text-base">
                        {workout.name}
                      </div>
                      <div className="text-sm text-gray-500 xl:text-base">
                        {getTotalExerciseLength(workout.programs)} exercises •{' '}
                        {workout.createdAt && `Created ${workout.createdAt}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link
                      to={`/workouts/${workout.id}/session`}
                      className="text-primary-600 hover:text-primary-500"
                    >
                      <Icon name="play" />
                    </Link>
                    <Button
                      className="text-red-600 hover:text-gray-500"
                      onClick={() => removeWorkoutMutation({ workoutId: workout.id })}
                    >
                      <Icon name="delete" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-4 text-center sm:px-6 bg-gray-50">
            <Link
              to="/workouts/create-workout"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm xl:text-base bg-primary-600 hover:bg-primary-700 focus:outline-none"
            >
              <Icon name="plus" className="mr-2" />
              Create New Workout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const MyWorkoutsTab: React.FC = () => {
  const { data, isLoading } = useGetProfileData();

  if (isLoading) {
    return (
      <section className="px-4 mt-8 sm:px-0 h-60">
        <div className="grid h-full">
          <LoadingSpinner size="md" variant="primary" />
        </div>
      </section>
    );
  }

  if (!data || !data.user) return <Navigate to="/login" replace />;

  return <WorkoutList userId={data.user.id} />;
};

export default MyWorkoutsTab;
