import { Link, useParams } from 'react-router';
import Icon from '../../components/ui/Icon/Icon';
import ExerciseList from '../../components/workout/WorkoutDetail/ExerciseList/ExerciseList';
import Header from '../../components/workout/WorkoutDetail/Header/Header';
import ProgramOverview from '../../components/workout/WorkoutDetail/ProgramOverview/ProgramOverview';
import WorkoutDescription from '../../components/workout/WorkoutDetail/WorkoutDescription/WorkoutDescription';
import { useGetWorkoutById } from '../../services/queries/workout';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner/LoadingSpinner';
import EmptyState from '../../components/shared/EmptyState/EmptyState';
import { getWorkoutExercises } from '../../utils/workout/workout-utils';

const WorkoutDetails: React.FC = () => {
  const { workoutId } = useParams<{ workoutId: string }>();

  if (!workoutId)
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <EmptyState
          title={`Workout ID is not valid`}
          action={
            <div className="pt-2">
              <Link
                to="/workouts"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
              >
                <Icon name="arrowLeft" className="mr-2" />
                Back to workouts
              </Link>
            </div>
          }
        />
      </section>
    );

  const { data: workout, isLoading, isError, error } = useGetWorkoutById(workoutId);

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

  if (!workout) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <EmptyState
          title={`Workout with ID: ${workoutId} not found`}
          action={
            <Link
              to="/workouts"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
            >
              <Icon name="plus" className="mr-2" />
              Back to workouts
            </Link>
          }
        />
      </section>
    );
  }

  return (
    <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="px-4 mb-4 sm:px-0">
        <Link
          to="/workouts"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          <Icon name="arrowLeft" className="mr-2" />
          Back to Workouts
        </Link>
      </div>

      <Header workout={workout} />

      <div className="px-4 mt-6 sm:px-0">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <WorkoutDescription description={workout.description} />
            <ExerciseList workoutExercises={getWorkoutExercises(workout.programs)} />
            <ProgramOverview workoutPrograms={workout.programs} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetails;
