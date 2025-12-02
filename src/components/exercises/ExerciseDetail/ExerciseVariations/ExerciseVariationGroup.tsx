import { singleExercise } from '../../exercise-mock-data';
import ExerciseVariation from './ExerciseVariation';

const ExerciseVariationGroup: React.FC = () => {
  return (
    <section className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-6 py-6 sm:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Exercise Variations</h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {singleExercise.variations.map((variation) => (
            <ExerciseVariation key={crypto.randomUUID()} variation={variation} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExerciseVariationGroup;
