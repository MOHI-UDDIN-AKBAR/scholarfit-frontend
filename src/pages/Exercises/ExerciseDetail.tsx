import { Link, useParams } from 'react-router';
import Button from '../../components/ui/Button/Button';
import Icon from '../../components/ui/Icon/Icon';
import ExerciseDemonstration from '../../components/exercises/ExerciseDetail/ExerciseDemonstration/ExerciseDemonstration';
import ExerciseDetailHeader from '../../components/exercises/ExerciseDetail/ExerciseDetailHeader/ExerciseDetailHeader';
import { useGetExerciseById } from '../../services/queries/exercise';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner/LoadingSpinner';

const ExerciseDetail: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();

  if (!exerciseId) return null;

  const { data: singleExercise, isError, error, isLoading } = useGetExerciseById(exerciseId);

  if (isLoading) {
    return (
      <section className="px-4 mt-8 sm:px-0 h-100">
        <div className="grid h-full">
          <LoadingSpinner size="xl" variant="primary" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 mt-8 h-100 sm:px-0">
        <div className="grid h-full place-items-center">
          {error?.message || 'Failed to load exercises'}
        </div>
      </section>
    );
  }

  if (!singleExercise) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <div className="grid h-full place-items-center">No exercise found </div>
      </section>
    );
  }

  return (
    <section className="max-w-full py-6 mx-auto sm:px-6 lg:px-8">
      <div className="px-4 mb-6 max-md:mb-4 sm:px-0">
        <Link to="/exercises">
          <Button
            type="button"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            <Icon name="arrowLeft" className="mr-2" />
            Back to Exercises
          </Button>
        </Link>
      </div>
      <ExerciseDetailHeader
        name={singleExercise.name}
        exerciseType={singleExercise.exerciseType}
        equipments={singleExercise.equipments}
        bodyParts={singleExercise.bodyParts}
        overview={singleExercise.overview}
      />

      <div className="px-4 mt-6 sm:px-0">
        <div className="grid grid-cols-1 gap-6 mb-6 max-md:mb-3">
          <ExerciseDemonstration
            videoUrl={singleExercise.videoUrl}
            instructions={singleExercise.instructions}
            targetMuscles={singleExercise.targetMuscles}
            secondaryMuscles={singleExercise.secondaryMuscles}
            exerciseTips={singleExercise.exerciseTips}
            variations={singleExercise.variations}
          />
        </div>
      </div>
    </section>
  );
};

export default ExerciseDetail;
