import Video from '../../../ui/Video/Video';
import ExerciseInstructions from '../ExerciseInstructions/ExerciseInstructions';
import ExerciseTipGroup from '../ExerciseTips/ExerciseTipGroup';
import ExerciseVariationGroup from '../ExerciseVariations/ExerciseVariationGroup';
import MusclesWorked from '../MusclesWorked/MusclesWorked';

type ExerciseDemonstrationProps = {
  videoUrl: string;
  instructions: string[];
  targetMuscles: string[];
  secondaryMuscles: string[];
  exerciseTips: string[];
  variations: string[];
};

const ExerciseDemonstration: React.FC<ExerciseDemonstrationProps> = ({
  videoUrl,
  instructions,
  targetMuscles,
  secondaryMuscles,
  exerciseTips,
  variations,
}) => {
  return (
    <section className="space-y-6 lg:col-span-2">
      <div className="overflow-hidden bg-white shadow rounded-2xl xl:rounded-3xl">
        <div className="px-6 py-6 sm:px-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Exercise Demonstration</h2>
          <div className="overflow-hidden aspect-w-16 aspect-h-9">
            <div className="flex items-center justify-center w-full h-full">
              <Video src={videoUrl} autoPlay={true} loop={true} />
            </div>
          </div>
        </div>
      </div>

      <ExerciseInstructions instructions={instructions} />

      <MusclesWorked targetMuscles={targetMuscles} secondaryMuscles={secondaryMuscles} />

      <ExerciseTipGroup exerciseTips={exerciseTips} />

      <ExerciseVariationGroup variations={variations} />
    </section>
  );
};

export default ExerciseDemonstration;
