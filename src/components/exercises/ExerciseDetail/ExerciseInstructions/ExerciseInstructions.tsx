import InstructionStep from './InstructionStep';

type ExerciseInstructionsProps = { instructions: string[] };

const ExerciseInstructions: React.FC<ExerciseInstructionsProps> = ({ instructions }) => {
  return (
    <section className="overflow-hidden bg-white rounded-md shadow sm:rounded-lg">
      <div className="px-6 py-8 sm:px-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Step-by-Step Instructions</h2>
        <div className="space-y-6">
          {instructions.map((instruction, i) => (
            <InstructionStep index={i} step={instruction} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExerciseInstructions;
