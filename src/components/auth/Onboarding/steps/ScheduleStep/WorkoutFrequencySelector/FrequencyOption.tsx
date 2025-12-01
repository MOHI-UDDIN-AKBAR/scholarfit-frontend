import type { NumericOption } from '../../../../../../config/onboarding-content';

type FrequencyOptionProps = {
  frequencyOption: NumericOption;
};
const FrequencyOption: React.FC<FrequencyOptionProps> = ({ frequencyOption: { value, label } }) => {
  return (
    <label className="schedule-option">
      <input type="radio" name="daysPerWeek" value={value.toString()} className="sr-only" />
      <span className="option-display">{label}</span>
    </label>
  );
};

export default FrequencyOption;
