import { useAppDispatch, useAppState } from '../../../../../../store/hooks';
import { addExerciseToExerciseModal } from '../../../../../../store/slices/workout-slices/workoutBuilderSlice';
import type { Exercise } from '../../../../../../types/exercise';
import { capitalize } from '../../../../../../utils/helpers/formatUtils';
import Button from '../../../../../ui/Button/Button';
import Icon from '../../../../../ui/Icon/Icon';
import { useGetExercises } from '../../../../../../services/queries/exercise';
import { LoadingSpinner } from '../../../../../shared/LoadingSpinner/LoadingSpinner';

type ExerciseLibraryListCardProps = {
  exercise: Exercise;
  hasButton: boolean;
};
export const ExerciseLibraryListCard: React.FC<ExerciseLibraryListCardProps> = ({
  exercise,
  hasButton = false,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="p-3 transition-colors border border-gray-200 rounded-md cursor-pointer exercise-library-item hover:bg-gray-50"
      data-exercise-id="ex_bench_press"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-gray-900">{exercise.name}</h4>
          <div className="flex items-center mt-1">
            <span className="text-xs text-gray-500">{capitalize(exercise.bodyParts[0])}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-xs text-gray-500">Beginner</span>
          </div>
        </div>
        {hasButton && (
          <Button
            className="add-exercise-btn text-primary-600 hover:text-primary-800"
            type="button"
            onClick={() => dispatch(addExerciseToExerciseModal({ exercise: exercise }))}
          >
            <Icon name="plus" />
          </Button>
        )}
      </div>
    </div>
  );
};

const ExerciseLibraryList: React.FC = () => {
  const { exerciseName, categoryType } = useAppState(
    (state) => state.workoutBuilder.exerciseFilterOptions
  );

  const { data, isLoading, isError, error } = useGetExercises('next', exerciseName, categoryType);
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
          {error?.message || 'Failed to load exercises'}
        </div>
      </section>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <div className="grid h-full place-items-center">No exercises found </div>
      </section>
    );
  }

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto">
      {data.data.slice(0, 9).map((exercise) => (
        <ExerciseLibraryListCard exercise={exercise} key={exercise.exerciseId} hasButton={true} />
      ))}
    </div>
  );
};

export default ExerciseLibraryList;
