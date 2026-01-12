import { useAppDispatch } from '../../../../../../store/hooks';
import {
  removeWorkoutProgram,
  setCurrentProgramId,
  toggleExerciseBrowserModal,
  type WorkoutProgramWithExercises,
} from '../../../../../../store/slices/workout-slices/workoutBuilderSlice';
import { convertArrayToString } from '../../../../../../utils/helpers/formatUtils';
import Button from '../../../../../ui/Button/Button';
import Icon from '../../../../../ui/Icon/Icon';
import ExercisesSection from '../../ExercisesSection/ExercisesSection';

type WorkoutProgramProps = {
  workoutProgram: WorkoutProgramWithExercises;
};

const WorkoutProgram: React.FC<WorkoutProgramProps> = ({ workoutProgram }) => {
  const dispatch = useAppDispatch();

  const handleAddExerciseButton = () => {
    dispatch(toggleExerciseBrowserModal(true));
    dispatch(setCurrentProgramId({ programId: workoutProgram.id! }));
  };

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg program-item bg-gray-50">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 cursor-pointer program-header">
        <div className="flex items-center">
          <Icon name="gripVertical" className="mr-3 text-gray-400 "></Icon>
          <div>
            <h3 className="font-medium text-gray-900">{workoutProgram.name}</h3>
            <p className="text-sm text-gray-600">
              {convertArrayToString(workoutProgram.muscleGroup)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
            Day {workoutProgram.dayNumber}
          </span>
          <Button
            className="text-red-600 delete-program-btn hover:text-red-800"
            onClick={() => dispatch(removeWorkoutProgram({ programId: workoutProgram.id! }))}
          >
            <Icon name="delete"></Icon>
          </Button>
        </div>
      </div>

      <div className="border-gray-200 program-content">
        <ExercisesSection
          programId={workoutProgram.id!}
          workoutExercises={workoutProgram.exercises}
        />
        {workoutProgram.exercises.length > 0 && (
          <div className="grid justify-center mt-4 mb-6 mr-4">
            <Button type="button" onClick={handleAddExerciseButton}>
              <Icon name="plus" className="mr-2" />
              Add More Exercise
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutProgram;
