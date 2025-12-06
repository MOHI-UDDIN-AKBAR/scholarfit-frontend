import { workoutDurationSelector } from '../../../../../../config/onboarding-content';
import DurationOption from './DurationOption';

const DurationOptionsGroup: React.FC = () => {
  const { questionTitle, options } = workoutDurationSelector;
  return (
    <section>
      <h3 className="mb-4 text-lg font-medium text-gray-900">{questionTitle}</h3>
      <form className="flex flex-wrap gap-3">
        {options.map((durationOption) => (
          <DurationOption durationOption={durationOption} key={durationOption.value} />
        ))}
      </form>
    </section>
  );
};

export default DurationOptionsGroup;
