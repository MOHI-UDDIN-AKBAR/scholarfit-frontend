import { workoutSplitSelector } from '../../../../../../config/onboarding-content';
import SplitOption from './SplitOption';

const SplitOptionsList: React.FC = () => {
  const { questionTitle, options } = workoutSplitSelector;
  return (
    <section>
      <h3 className="mb-4 text-lg font-medium text-gray-900">{questionTitle}</h3>
      <div className="grid space-y-4 ">
        {options.map((splitOption) => (
          <SplitOption splitOption={splitOption} key={splitOption.value} />
        ))}
      </div>
    </section>
  );
};

export default SplitOptionsList;
