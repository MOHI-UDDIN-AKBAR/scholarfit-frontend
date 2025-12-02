import { exercises } from '../exercise-mock-data';
import ExerciseCard from '../ExerciseCard/ExerciseCard';

const ExerciseGrid: React.FC = () => {
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
