import ExerciseCard from '../ExerciseCard/ExerciseCard';
import { LoadingSpinner } from '../../shared/LoadingSpinner/LoadingSpinner';
import type { ExercisesQueryState } from '../../../types/exercise';

const ExerciseGrid: React.FC<ExercisesQueryState> = ({ isError, isLoading, exercises, error }) => {
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

  if (!exercises || exercises.length === 0) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <div className="grid h-full place-items-center">No exercises found </div>
      </section>
    );
  }

  return (
    <section className="px-4 mt-8 sm:px-0">
      <div className="grid grid-cols-1 gap-6 xl:gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {exercises.map((exercise) => (
          <ExerciseCard exercise={exercise} key={exercise.exerciseId} />
        ))}
      </div>
    </section>
  );
};

export default ExerciseGrid;
