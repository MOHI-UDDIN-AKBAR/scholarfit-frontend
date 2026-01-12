import { useAppDispatch } from '../../../../../store/hooks';
import Button from '../../../../ui/Button/Button';
import Icon from '../../../../ui/Icon/Icon';
import {
  removeWorkoutExercise,
  setCurrentProgramId,
  toggleExerciseBrowserModal,
  type DraftExerciseConfig,
} from '../../../../../store/slices/workout-slices/workoutBuilderSlice';
import { useCallback } from 'react';
import EmptyState from '../../../../shared/EmptyState/EmptyState';

type ExercisesSectionProps = {
  programId: string;
  workoutExercises: DraftExerciseConfig[];
};

const ExercisesSection: React.FC<ExercisesSectionProps> = ({ programId, workoutExercises }) => {
  const dispatch = useAppDispatch();
  const workoutExercisesLength = workoutExercises?.length ?? 0;

  const handleAddExerciseButton = useCallback(() => {
    dispatch(toggleExerciseBrowserModal(true));
    dispatch(setCurrentProgramId({ programId }));
  }, [dispatch, programId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Exercises</h2>
        <span id="exercise-count" className="text-sm text-gray-500">
          {workoutExercisesLength} exercises added
        </span>
      </div>
      {workoutExercisesLength === 0 ? (
        <EmptyState
          title="No exercises added yet"
          description="Start building your workout by adding exercises below."
          containerClassName="py-12 text-center"
          headingClassName="mb-2 text-lg font-medium text-gray-900"
          paragraphClassName="mb-4 text-gray-500"
          icon={<Icon name="dumbbell" className="w-full h-full " />}
          action={
            <Button
              id="add-first-exercise"
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
              onClick={handleAddExerciseButton}
            >
              <Icon name="plus" className="mr-2" />
              Add Your First Exercise
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {workoutExercises.map((workoutExercise) => (
            <div
              className="p-4 border border-gray-200 rounded-lg exercise-item bg-gray-50"
              key={workoutExercise.id}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 drag-handle">
                    <Icon name="gripVertical" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{workoutExercise.exercise?.name}</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-600">
                        {workoutExercise.exercise!.bodyParts[0]}
                      </span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-700">
                      <span className="mr-4">
                        <span className="font-medium">{workoutExercise.sets}</span>
                        sets
                      </span>
                      <span className="mr-4">
                        <span className="font-medium"> {workoutExercise.reps}</span> reps
                      </span>
                      <span>
                        <span className="font-medium"> {workoutExercise.rest}</span> sec rest
                      </span>
                    </div>
                    {workoutExercise.notes && (
                      <p className="mt-2 text-sm text-gray-600"> {workoutExercise.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    className="text-red-600 delete-exercise-btn hover:text-red-800"
                    onClick={() =>
                      dispatch(
                        removeWorkoutExercise({ exerciseId: workoutExercise.id!, programId })
                      )
                    }
                  >
                    <Icon name="delete" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExercisesSection;
