type InstructionStepProps = {
  step: string;
  index: number;
};

const InstructionStep: React.FC<InstructionStepProps> = ({ index, step }) => {
  return (
    <div className="flex">
      <span className="flex items-center justify-center w-8 h-8 text-base font-bold rounded-full shrink-0 bg-primary-100 text-primary-600">
        {index + 1}
      </span>
      <div className="ml-4">
        <p className="text-lg text-gray-600 ">{step}</p>
      </div>
    </div>
  );
};

export default InstructionStep;
