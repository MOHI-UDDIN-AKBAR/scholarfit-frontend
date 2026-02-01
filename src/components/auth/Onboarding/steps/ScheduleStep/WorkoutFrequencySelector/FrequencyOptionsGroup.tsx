import clsx from 'clsx';
import { workoutFrequencyOptionsGroup } from '../../../../../../config/onboarding-content';
import FrequencyOption from './FrequencyOption';

type FrequencyOptionsGroupProps = {
  wrapperClassName?: string;
  labelClassName?: string;
};
const FrequencyOptionsGroup: React.FC<FrequencyOptionsGroupProps> = ({
  wrapperClassName,
  labelClassName,
}) => {
  const { questionTitle, options } = workoutFrequencyOptionsGroup;

  return (
    <section>
      <h3
        className={clsx(
          'text-gray-900',
          wrapperClassName ? wrapperClassName : 'text-lg mb-4 font-medium '
        )}
      >
        {questionTitle}
      </h3>
      <div className="flex flex-wrap gap-3">
        {options.map((frequencyOption) => (
          <FrequencyOption
            frequencyOption={frequencyOption}
            key={frequencyOption.value}
            labelClassName={labelClassName}
          />
        ))}
      </div>
    </section>
  );
};

export default FrequencyOptionsGroup;
