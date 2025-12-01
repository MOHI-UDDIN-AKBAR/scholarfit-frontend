import { workoutFrequencyOptionsGroup } from '../../../../../../config/onboarding-content';
import FrequencyOption from './FrequencyOption';

const FrequencyOptionsGroup: React.FC = () => {
  const { questionTitle, options } = workoutFrequencyOptionsGroup;

  return (
    <section>
      <h3 className="mb-4 text-lg font-medium text-gray-900">{questionTitle}</h3>
      <div className="flex flex-wrap gap-3">
        {options.map((frequencyOption) => (
          <FrequencyOption frequencyOption={frequencyOption} key={frequencyOption.value} />
        ))}
      </div>
    </section>
  );
};

export default FrequencyOptionsGroup;
