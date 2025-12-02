import Video from '../../../ui/Video/Video';
import { singleExercise } from '../../exercise-mock-data';
import ExerciseInstructions from '../ExerciseInstructions/ExerciseInstructions';
import ExerciseTipGroup from '../ExerciseTips/ExerciseTipGroup';
import ExerciseVariationGroup from '../ExerciseVariations/ExerciseVariationGroup';
import MusclesWorked from '../MusclesWorked/MusclesWorked';

const ExerciseDemonstration: React.FC = () => {
  return (
    <section className="space-y-6 lg:col-span-2">
      <div className="overflow-hidden bg-white shadow rounded-2xl xl:rounded-3xl">
        <div className="px-6 py-6 sm:px-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Exercise Demonstration</h2>
          <div className="overflow-hidden aspect-w-16 aspect-h-9">
            <div className="flex items-center justify-center w-full h-full">
              <Video src={singleExercise.videoUrl} autoPlay={true} loop={true} />
            </div>
          </div>
        </div>
      </div>

      <ExerciseInstructions />

      <MusclesWorked />

      <ExerciseTipGroup />

      <ExerciseVariationGroup />
    </section>
  );
};

export default ExerciseDemonstration;
