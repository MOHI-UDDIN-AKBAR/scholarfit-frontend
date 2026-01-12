import { useNavigate } from 'react-router';
import Button from '../../../ui/Button/Button';
import Icon from '../../../ui/Icon/Icon';
import StepIndicator from './StepIndicator/StepIndicator';
import { LoadingSpinner } from '../../../shared/LoadingSpinner/LoadingSpinner';
import { useAppDispatch, useAppState } from '../../../../store/hooks';
import { undoWorkoutBuilderState } from '../../../../store/slices/workout-slices/workoutBuilderSlice';
import { shallowEqual } from 'react-redux';
import type { WorkoutInput } from '../../../../types/workout';
import { useCreateWorkout } from '../../../../services/mutations/workout';

const Header: React.FC<{ isPending: boolean }> = ({ isPending }) => {
  const navigate = useNavigate();
  const { isReadyToCreate, workoutPayload } = useAppState(
    (state) => ({
      isReadyToCreate: state.workoutBuilder.isReadyToCreate,
      workoutPayload: state.workoutBuilder.workoutPayload,
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();

  const { mutate: createWorkoutMutation } = useCreateWorkout();

  const handleAwayFromWorkoutBuilder = () => {
    dispatch(undoWorkoutBuilderState());
    navigate(-1);
  };

  const handleAddWorkout = (workoutPayload: WorkoutInput) => {
    navigate('/workouts');
    createWorkoutMutation(workoutPayload);
    dispatch(undoWorkoutBuilderState());
  };

  return (
    <header className="px-4 sm:px-0">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Create Custom Workout
          </h1>
          <p className="mt-2.5 text-base text-gray-500">
            Build your own workout by adding exercises and customizing sets, reps, and rest periods.
          </p>
        </div>
        <div className="flex mt-4 space-x-3 md:mt-0 md:ml-4">
          <Button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
            onClick={handleAwayFromWorkoutBuilder}
          >
            Cancel
          </Button>
          {isReadyToCreate && workoutPayload ? (
            <Button
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none"
              onClick={() => handleAddWorkout(workoutPayload)}
            >
              <Icon name="check" className="mr-2" />
              Add Workout
            </Button>
          ) : (
            <Button
              type="submit"
              className="'inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
            >
              {isPending ? (
                <LoadingSpinner
                  text="saving workout..."
                  showText={true}
                  variant="white"
                  size="sm"
                  textClassName="text-white!"
                />
              ) : (
                <>
                  <Icon name="save" className="mr-2" />
                  Save Workout
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <StepIndicator />
    </header>
  );
};

export default Header;
