import ExerciseTip from './ExerciseTip';

type ExerciseTipGroupProps = { exerciseTips: string[] };

const ExerciseTipGroup: React.FC<ExerciseTipGroupProps> = ({ exerciseTips }) => {
  return (
    <section className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-6 py-6 sm:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Exercise Tips</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-medium text-green-700">Proper Form Cues</h3>
            <ul className="space-y-3">
              {exerciseTips.map((exerciseTip) => (
                <ExerciseTip key={crypto.randomUUID()} exerciseTip={exerciseTip} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExerciseTipGroup;
