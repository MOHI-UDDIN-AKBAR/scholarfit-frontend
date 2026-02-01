import { useGetExerciseById } from '../../../../services/queries/exercise';
import { LoadingSpinner } from '../../../shared/LoadingSpinner/LoadingSpinner';
import Icon from '../../../ui/Icon/Icon';
import Video from '../../../ui/Video/Video';

type InstructionListProps = { title: string; items: string[] };

const InstructionList: React.FC<InstructionListProps> = ({ title, items }) => {
  return (
    <div>
      <h4 className="mb-2 font-medium text-gray-600">{title}</h4>
      <ul className="space-y-2 text-gray-600">
        {items.map((content) => (
          <li
            className="flex items-start animate-fade-in "
            style={{ animationDelay: '0.1s' }}
            key={crypto.randomUUID()}
          >
            <Icon name="check" className="mr-2 text-green-500 shrink-0" />
            <span>{content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

type ExerciseInstructionsPanelProps = {
  exerciseId: string;
};

const ExerciseInstructionsPanel: React.FC<ExerciseInstructionsPanelProps> = ({ exerciseId }) => {
  const { data: currentExercise, isLoading, isError, error } = useGetExerciseById(exerciseId);

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
          {error?.message || 'Failed to load exercise details'}
        </div>
      </section>
    );
  }

  if (!currentExercise) return null;

  return (
    <div className="p-6 my-6 overflow-hidden transition-all duration-300 bg-white shadow-xl rounded-2xl ">
      <h3 className="mb-4 text-lg font-bold text-gray-600">Exercise Instructions</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InstructionList title="How to Perform" items={currentExercise.instructions} />
        <InstructionList title="Tips and tricks" items={currentExercise.exerciseTips} />
      </div>

      <div className="pt-6 mt-6 border-t border-gray-700">
        <h4 className="mb-3 font-medium text-gray-600">Video Demonstration</h4>
        <div className="relative flex items-center justify-center overflow-hidden bg-gray-700 rounded-xl aspect-video">
          <div className="absolute inset-0 bg-linear-to-br from-primary-100/90 to-primary-300/80"></div>
          <Video src={currentExercise.videoUrl} autoPlay={true} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default ExerciseInstructionsPanel;
